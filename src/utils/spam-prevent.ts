import FingerprintJS from '@fingerprintjs/fingerprintjs';

interface SpamRecord {
  fingerprint: string;
  submissions: {
    timestamp: number;
    count: number;
  }[];
  blocked: boolean;
  blockedUntil?: number;
}

const STORAGE_KEY = 'contact_form_spam';
const DAILY_LIMIT = 2; // 2 messages per day
const BLOCK_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const COOKIE_NAME = 'cf_fingerprint';

// Generate or get browser fingerprint
export async function getBrowserFingerprint(): Promise<string> {
  try {
    // Check if we already have a fingerprint in localStorage
    const storedFingerprint = localStorage.getItem(COOKIE_NAME);
    if (storedFingerprint) {
      return storedFingerprint;
    }

    // Generate new fingerprint
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const fingerprint = result.visitorId;
    
    // Store fingerprint
    localStorage.setItem(COOKIE_NAME, fingerprint);
    
    return fingerprint;
  } catch (error) {
    // Fallback: generate a random fingerprint if FingerprintJS fails
    const fallbackFingerprint = localStorage.getItem(COOKIE_NAME) || 
      `fallback_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    localStorage.setItem(COOKIE_NAME, fallbackFingerprint);
    return fallbackFingerprint;
  }
}

// Get all spam records
function getSpamRecords(): Record<string, SpamRecord> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Save spam records
function saveSpamRecords(records: Record<string, SpamRecord>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error('Failed to save spam records:', error);
  }
}

// Clean old records
function cleanOldRecords(records: Record<string, SpamRecord>): void {
  const now = Date.now();
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000; // Keep records for 1 week

  Object.keys(records).forEach(key => {
    const record = records[key];
    // Remove submissions older than 24 hours
    record.submissions = record.submissions.filter(
      sub => sub.timestamp > now - 24 * 60 * 60 * 1000
    );
    
    // Remove unblocked records older than 1 week
    if (!record.blocked && record.submissions.length === 0) {
      delete records[key];
    }
  });
}

// Check if user can submit
export async function checkSpamLimit(): Promise<{
  allowed: boolean;
  remaining: number;
  waitTime?: number;
  message?: string;
}> {
  const now = Date.now();
  const fingerprint = await getBrowserFingerprint();
  const records = getSpamRecords();
  
  // Clean old records
  cleanOldRecords(records);
  
  let record = records[fingerprint];
  
  // Create new record if doesn't exist
  if (!record) {
    record = {
      fingerprint,
      submissions: [],
      blocked: false,
    };
    records[fingerprint] = record;
  }
  
  // Check if user is blocked
  if (record.blocked && record.blockedUntil) {
    if (now < record.blockedUntil) {
      const waitHours = Math.ceil((record.blockedUntil - now) / (60 * 60 * 1000));
      return {
        allowed: false,
        remaining: 0,
        waitTime: record.blockedUntil - now,
        message: `You are blocked. Please try again in ${waitHours} hours.`,
      };
    } else {
      // Unblock if time has passed
      record.blocked = false;
      record.blockedUntil = undefined;
    }
  }
  
  // Count today's submissions
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todaySubmissions = record.submissions.filter(
    sub => sub.timestamp >= todayStart.getTime()
  );
  
  const totalToday = todaySubmissions.reduce((sum, sub) => sum + sub.count, 0);
  const remaining = DAILY_LIMIT - totalToday;
  
  if (remaining <= 0) {
    // Block the user for the rest of the day
    const tomorrow = new Date(todayStart);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const waitTime = tomorrow.getTime() - now;
    const waitHours = Math.ceil(waitTime / (60 * 60 * 1000));
    
    record.blocked = true;
    record.blockedUntil = tomorrow.getTime();
    saveSpamRecords(records);
    
    return {
      allowed: false,
      remaining: 0,
      waitTime,
      message: `Daily limit reached. Please try again in ${waitHours} hours.`,
    };
  }
  
  saveSpamRecords(records);
  
  return {
    allowed: true,
    remaining,
    message: `${remaining} message(s) remaining today.`,
  };
}

// Record a submission
export async function recordSubmission(): Promise<void> {
  const fingerprint = await getBrowserFingerprint();
  const records = getSpamRecords();
  
  if (!records[fingerprint]) {
    records[fingerprint] = {
      fingerprint,
      submissions: [],
      blocked: false,
    };
  }
  
  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  
  // Find today's submission record or create new
  let todayRecord = records[fingerprint].submissions.find(
    sub => sub.timestamp >= todayStart.getTime()
  );
  
  if (todayRecord) {
    todayRecord.count += 1;
  } else {
    records[fingerprint].submissions.push({
      timestamp: now,
      count: 1,
    });
  }
  
  saveSpamRecords(records);
}

// Additional security checks
export async function performSecurityChecks(): Promise<{
  passed: boolean;
  reason?: string;
}> {
  // Check if localStorage is available (bots might not have it)
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
  } catch {
    return {
      passed: false,
      reason: 'LocalStorage not available',
    };
  }
  
  // Check if JavaScript is enabled (should be since we're running code)
  
  // Check submission timing (reject if submitted too quickly - less than 3 seconds)
  const lastPageLoad = sessionStorage.getItem('page_load_time');
  const now = Date.now();
  
  if (lastPageLoad) {
    const timeOnPage = now - parseInt(lastPageLoad);
    if (timeOnPage < 3000) { // Less than 3 seconds
      return {
        passed: false,
        reason: 'Submitted too quickly',
      };
    }
  }
  
  // Store page load time
  sessionStorage.setItem('page_load_time', now.toString());
  
  return { passed: true };
}

// Clear spam records (for testing)
export function clearSpamRecords(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(COOKIE_NAME);
}