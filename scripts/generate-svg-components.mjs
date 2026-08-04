import fs from "fs-extra";
import path from "path";
import { glob } from "glob";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// CONFIG - Change these paths as needed
// ============================================
const SVG_SOURCE_DIR = path.join(__dirname, "../public/icons");
const COMPONENTS_OUTPUT_DIR = path.join(__dirname, "../src/components/icons");
const INDEX_FILE = path.join(COMPONENTS_OUTPUT_DIR, "index.ts");
// ============================================

/**
 * Convert filename to PascalCase component name
 * email-icon.svg => EmailIconIcon (or just EmailIcon)
 */
function toPascalCase(str) {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toUpperCase());
}

/**
 * Clean SVG content:
 * - Remove XML declaration
 * - Remove comments
 * - Remove fixed width/height (we handle via props)
 * - Optionally replace colors based on config
 */
function processSvgContent(svgContent, preserveColors = true) {
  let processed = svgContent
    // Remove XML declaration
    .replace(/<\?xml[^?]*\?>/g, "")
    // Remove comments
    .replace(/<!--[\s\S]*?-->/g, "")
    // Remove fixed width and height attributes from <svg>
    .replace(/<svg([^>]*)width="[^"]*"/, "<svg$1")
    .replace(/<svg([^>]*)height="[^"]*"/, "<svg$1")
    .trim();

  // Only replace colors if NOT preserving them
  if (!preserveColors) {
    // Replace hardcoded stroke colors with currentColor
    processed = processed
      .replace(/stroke="#[0-9a-fA-F]{3,6}"/g, 'stroke="currentColor"')
      .replace(/stroke="black"/g, 'stroke="currentColor"')
      .replace(/stroke="white"/g, 'stroke="currentColor"')
      // Replace hardcoded fill colors with currentColor
      .replace(/fill="#[0-9a-fA-F]{3,6}"/g, 'fill="currentColor"')
      .replace(/fill="black"/g, 'fill="currentColor"')
      // Keep fill="none" as is (important for outlined icons)
      .replace(/fill="currentColor" /g, (match, offset, string) => {
        return match;
      });
  }

  return processed;
}

/**
 * Extract SVG inner content and attributes
 */
function extractSvgParts(svgContent) {
  // Get viewBox
  const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

  // Get xmlns
  const xmlnsMatch = svgContent.match(/xmlns="([^"]*)"/);
  const xmlns = xmlnsMatch ? xmlnsMatch[1] : "http://www.w3.org/2000/svg";

  // Get preserveAspectRatio if exists
  const preserveAspectRatioMatch = svgContent.match(
    /preserveAspectRatio="([^"]*)"/,
  );
  const preserveAspectRatio = preserveAspectRatioMatch
    ? preserveAspectRatioMatch[1]
    : "";

  // Extract inner content (everything between <svg...> and </svg>)
  const innerMatch = svgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  const innerContent = innerMatch ? innerMatch[1].trim() : "";

  return { viewBox, xmlns, preserveAspectRatio, innerContent };
}

/**
 * Convert SVG attributes to JSX (stroke-width => strokeWidth, etc.)
 */
function svgToJsx(svgContent) {
  return svgContent
    .replace(/class=/g, "className=")
    .replace(/stroke-width=/g, "strokeWidth=")
    .replace(/stroke-linecap=/g, "strokeLinecap=")
    .replace(/stroke-linejoin=/g, "strokeLinejoin=")
    .replace(/fill-rule=/g, "fillRule=")
    .replace(/clip-rule=/g, "clipRule=")
    .replace(/stroke-dasharray=/g, "strokeDasharray=")
    .replace(/stroke-dashoffset=/g, "strokeDashoffset=")
    .replace(/stop-color=/g, "stopColor=")
    .replace(/stop-opacity=/g, "stopOpacity=")
    .replace(/fill-opacity=/g, "fillOpacity=")
    .replace(/stroke-opacity=/g, "strokeOpacity=")
    .replace(/clip-path=/g, "clipPath=")
    .replace(/font-size=/g, "fontSize=")
    .replace(/font-family=/g, "fontFamily=")
    .replace(/text-anchor=/g, "textAnchor=")
    .replace(/dominant-baseline=/g, "dominantBaseline=")
    .replace(/xmlns:xlink=/g, "xmlnsXlink=")
    .replace(/xlink:href=/g, "xlinkHref=");
}

/**
 * Generate React component string
 */
function generateComponent(componentName, svgContent, preserveColors = true) {
  const processed = processSvgContent(svgContent, preserveColors);
  const { viewBox, xmlns, preserveAspectRatio, innerContent } =
    extractSvgParts(processed);
  const jsxInnerContent = svgToJsx(innerContent);

  const preserveAspectRatioAttr = preserveAspectRatio
    ? `\n      preserveAspectRatio="${preserveAspectRatio}"`
    : "";

  return `import React from "react";

interface ${componentName}Props {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  [key: string]: unknown; // for any additional SVG props
}

const ${componentName} = ({
  size = 24,
  color,
  className = "",
  style,
  onClick,
  ...rest
}: ${componentName}Props) => {
  return (
    <svg
      xmlns="${xmlns}"${preserveAspectRatioAttr}
      viewBox="${viewBox}"
      width={size}
      height={size}
      color={color}
      className={className}
      style={style}
      onClick={onClick}
      {...rest}
    >
      ${jsxInnerContent}
    </svg>
  );
};

export default ${componentName};
`;
}

/**
 * Main function
 */
async function generateSvgComponents() {
  console.log("🚀 Starting SVG Component Generator...\n");

  // Ensure output directory exists
  await fs.ensureDir(COMPONENTS_OUTPUT_DIR);

  // Find all SVG files
  const svgFiles = await glob(`${SVG_SOURCE_DIR}/**/*.svg`);

  if (svgFiles.length === 0) {
    console.log(`❌ No SVG files found in: ${SVG_SOURCE_DIR}`);
    console.log("Please check your SVG_SOURCE_DIR path in the script.");
    return;
  }

  console.log(`📂 Found ${svgFiles.length} SVG file(s)\n`);

  const generatedComponents = [];
  const errors = [];

  for (const svgFile of svgFiles) {
    const fileName = path.basename(svgFile, ".svg");
    const componentName = toPascalCase(fileName) + "Icon";
    const outputFile = path.join(COMPONENTS_OUTPUT_DIR, `${componentName}.tsx`);

    try {
      // Read SVG file
      const svgContent = await fs.readFile(svgFile, "utf-8");

      // Check if this is a multi-colored logo that should preserve colors
      const hasGradients =
        svgContent.includes("linearGradient") ||
        svgContent.includes("radialGradient");
      const hasMultipleColors =
        (svgContent.match(/fill="#[0-9a-fA-F]{6}"/g) || []).length > 1;
      const preserveColors = hasGradients || hasMultipleColors;

      // Generate component with appropriate color handling
      const componentCode = generateComponent(
        componentName,
        svgContent,
        preserveColors,
      );

      // Write component file
      await fs.writeFile(outputFile, componentCode, "utf-8");

      generatedComponents.push({
        name: componentName,
        file: `${componentName}.tsx`,
        source: path.relative(process.cwd(), svgFile),
        preservesColors: preserveColors,
      });

      const colorStatus = preserveColors ? "🎨 (preserved)" : "⚪ (monochrome)";
      console.log(
        `✅ Generated: ${componentName}.tsx  ← ${fileName}.svg ${colorStatus}`,
      );
    } catch (error) {
      errors.push({ file: svgFile, error: error.message });
      console.error(`❌ Failed: ${fileName}.svg - ${error.message}`);
    }
  }

  // Generate index.ts for easy imports
  if (generatedComponents.length > 0) {
    const indexContent = generatedComponents
      .map((c) => `export { default as ${c.name} } from "./${c.name}";`)
      .join("\n");

    await fs.writeFile(INDEX_FILE, indexContent + "\n", "utf-8");
    console.log(
      `\n📦 Generated index.ts with ${generatedComponents.length} exports`,
    );
  }

  // Summary
  console.log("\n==============================");
  console.log(`✨ Done! ${generatedComponents.length} component(s) generated`);
  console.log(`📁 Output: ${COMPONENTS_OUTPUT_DIR}`);

  const preserved = generatedComponents.filter((c) => c.preservesColors);
  if (preserved.length > 0) {
    console.log(
      `🎨 ${preserved.length} component(s) preserve their original colors`,
    );
  }

  if (errors.length > 0) {
    console.log(`⚠️  ${errors.length} error(s) occurred`);
  }
  console.log("==============================\n");

  // Usage example
  if (generatedComponents.length > 0) {
    console.log("💡 Usage Example:");
    console.log("─────────────────");
    const example = generatedComponents[0];
    console.log(`import { ${example.name} } from "@/components/icons";\n`);
    console.log(`// Basic usage (preserves original colors if multi-colored)`);
    console.log(`<${example.name} />\n`);
    console.log(`// With size override`);
    console.log(`<${example.name} size={48} />\n`);
    console.log(`// With color override (only works for single-color icons)`);
    console.log(`<${example.name} size={32} color="blue" />\n`);
  }
}

// Run
generateSvgComponents().catch(console.error);
