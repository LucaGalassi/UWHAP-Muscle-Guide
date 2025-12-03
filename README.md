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

## Deployment

This project auto-deploys to GitHub Pages using the modern Pages workflow.

- Trigger: any push to `main` (and `workflow_dispatch` from the Actions tab).
- Workflow: `.github/workflows/deploy.yml` builds the app (`npm run build`), uploads the `dist` artifact, and publishes with `actions/deploy-pages@v4`.
- No `gh-pages` branch is used anymore; deployments happen directly from the build artifact.

To deploy manually without pushing, open the Actions tab and run the "Deploy to GitHub Pages" workflow via "Run workflow".

## Beta Animation Viewer (V6.5)
- Purpose: Preview simple, in-app animations for common motions (flexion, extension, abduction, etc.) without relying on external image search.
- Access: In any muscle view header, click the `Beta Animation` (sparkles) button.
- Behavior: Opens a modal with a motion selector and a basic SVG animation. Includes play/pause.
- Disclaimer: This feature is experimental. Animations are rough approximations and may not match exact joint axes, ranges of motion, or specific muscle biomechanics. Use for general visualization only.
- Future improvements:
  - Use Three.js/WebGL with rigged skeletons (GLTF) for articulated motion.
  - Parameterize joint axes and ranges per region.
  - Overlay labels, angles, and dynamic guidance.

## Advanced 3D Animation Viewer (Experimental)
- Purpose: A more accurate, articulated visualization using `react-three-fiber`.
- Access: Click the `Target` icon in the muscle header to open the Advanced Viewer.
- Install deps:

```zsh
npm install three @react-three/fiber @react-three/drei
```

- Capabilities:
   - Articulated limb rig (shoulder, elbow, forearm, hip) with parameterized axes.
   - Motion presets (Elbow Flexion/Extension, Shoulder Abd/Add, Medial/Lateral Rot, Forearm Pro/Sup, Hip Flex/Ext).
   - Camera presets (Front/Side/Top) + Orbit controls.
   - Angle readout and basic axis helpers.
- Limitations:
   - Approximations only; not a medical simulation. No GLTF skeleton/bones yet.
   - Axes and ranges simplified; coupling motions not modeled.
- Roadmap:
   - Load rigged GLTF skeleton, map bones to anatomical joints.
   - Joint constraints per anatomical axes and region.
   - Dynamic overlays: labels, angle arcs, axes, ranges.
