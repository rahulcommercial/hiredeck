/**
 * Public entry point. Splits resume schema and sample data into separate
 * modules to avoid module-evaluation circular references.
 */
export * from "./resume";
export { sampleResume } from "./sample";
