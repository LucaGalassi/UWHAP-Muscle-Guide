<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Cr_IBWJ19pE25MdcvfcCQFNmT-6gJ69k

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Beta Animation Viewer (V6.5)
- Purpose: Preview simple, in-app animations for common motions (flexion, extension, abduction, etc.) without relying on external image search.
- Access: In any muscle view header, click the `Beta Animation` (sparkles) button.
- Behavior: Opens a modal with a motion selector and a basic SVG animation. Includes play/pause.
- Disclaimer: This feature is experimental. Animations are rough approximations and may not match exact joint axes, ranges of motion, or specific muscle biomechanics. Use for general visualization only.
- Future improvements:
  - Use Three.js/WebGL with rigged skeletons (GLTF) for articulated motion.
  - Parameterize joint axes and ranges per region.
  - Overlay labels, angles, and dynamic guidance.
