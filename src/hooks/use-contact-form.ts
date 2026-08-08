import { useState, useRef, useCallback, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { 
  checkSpamLimit, 
  recordSubmission, 
  performSecurityChecks,
  getBrowserFingerprint 
} from "@/utils";

interface FormData {
  name: string;
  email: string;
  subject: string;
  details: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  details?: string;
}

export const MAX_ATTEMPTS = 2; // Daily limit

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    details: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | "blocked"
  >("idle");
  const [remainingSubmissions, setRemainingSubmissions] = useState<number>(2);
  const [blockMessage, setBlockMessage] = useState<string>("");
  const [fingerprint, setFingerprint] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize fingerprint and check limits on mount
  useEffect(() => {
    const init = async () => {
      const fp = await getBrowserFingerprint();
      setFingerprint(fp);
      
      const limit = await checkSpamLimit();
      setRemainingSubmissions(limit.remaining);
      
      if (!limit.allowed) {
        setBlockMessage(limit.message || "");
        setSubmitStatus("blocked");
      }
    };
    
    init();
  }, []);

  // Basic validation
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "validation.name.required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "validation.name.minLength";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "validation.name.maxLength";
    } else if (!/^[\p{L}\s'-]+$/u.test(formData.name.trim())) {
      newErrors.name = "validation.name.invalid";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "validation.email.required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "validation.email.invalid";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "validation.subject.required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "validation.subject.minLength";
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = "validation.subject.maxLength";
    }

    // Details validation
    if (!formData.details.trim()) {
      newErrors.details = "validation.message.required";
    } else if (formData.details.trim().length < 10) {
      newErrors.details = "validation.message.minLength";
    } else if (formData.details.trim().length > 1000) {
      newErrors.details = "validation.message.maxLength";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle input changes
  const handleChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  // Honeypot check
  const honeypotCheck = useCallback((): boolean => {
    const honeypot = document.getElementById(
      "honeypot-field"
    ) as HTMLInputElement;
    return !honeypot?.value;
  }, []);

  // Submit handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Check if already blocked
      if (submitStatus === "blocked") {
        return;
      }

      // Security checks
      const securityCheck = await performSecurityChecks();
      if (!securityCheck.passed) {
        setSubmitStatus("error");
        setErrors({ email: "Security check failed. Please try again." });
        return;
      }

      // Check spam limit
      const limitCheck = await checkSpamLimit();
      if (!limitCheck.allowed) {
        setSubmitStatus("blocked");
        setBlockMessage(limitCheck.message || "");
        setRemainingSubmissions(0);
        return;
      }

      // Validate form
      if (!validateForm()) return;

      // Check honeypot
      if (!honeypotCheck()) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", details: "" });
        return;
      }

      setIsSubmitting(true);
      setSubmitStatus("idle");

      try {
        const now = new Date();
        const submissionDate = now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const submissionTime = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.details,
            service: formData.subject,
            phone_number: "Not provided",
            submission_date: submissionDate,
            submission_time: submissionTime,
            fingerprint: fingerprint,
            to_name: "Your Name",
            reply_to: formData.email,
          },
          publicKey,
        );

        // Record submission
        await recordSubmission();
        
        // Update remaining count
        const updatedLimit = await checkSpamLimit();
        setRemainingSubmissions(updatedLimit.remaining);

        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", details: "" });

        setTimeout(() => setSubmitStatus("idle"), 5000);
      } catch (error) {
        console.error("Failed to send email:", error);
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, honeypotCheck, fingerprint, submitStatus]
  );

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    remainingSubmissions,
    blockMessage,
    formRef,
    handleChange,
    handleSubmit,
    MAX_ATTEMPTS,
  };
}