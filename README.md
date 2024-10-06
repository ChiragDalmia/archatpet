
# PortaPet - README

## Inspiration
Moving to a new country can make it difficult to stay connected with loved ones, especially pets. PortaPet was created to ease this separation by providing comfort and companionship through an interactive virtual experience.

## What it Does
PortaPet allows users to upload images of their pets, which are converted into 3D models using augmented reality. Users can talk to their virtual pets via AI-driven conversations and visualize memories through lifelike 3D renderings. It offers emotional support for those separated from their pets or grieving their loss.

## How We Built It
- **Frontend**: Built using TypeScript in a Next.js framework with Tailwind CSS for styling. We used Lucide React for icons, Three.js for 3D rendering, and Spline & GSAP for animations.
- **Backend**: Images uploaded by users are stored via Vercel Blob, which sends them to MeshyAPI for 3D rendering. We used Cloudflare for AI responses and ElevenLabs for speech synthesis, allowing pets to respond naturally. Wake word functionality triggers interactions when the pet's name is called.
- **Tech Stack**: Next.js, WebXR, Three.js, Vercel Blob, MeshyAPI, Cloudflare, ElevenLabs, Web Speech API.

## Challenges
- Balancing technical limitations with the emotional aspect of the project.
- Ensuring AI-generated conversations felt personalized and genuine.
- Maintaining performance and cross-device compatibility for real-time interaction.

## Accomplishments
- Successfully built an immersive and emotional user experience.
- Integrated advanced technologies (AI, 3D rendering, XR, and speech synthesis) into a unified platform.

## Lessons Learned
- The importance of human-centered design in emotionally-driven projects.
- How to implement and deploy extended reality (XR) apps and 3D rendering.
- Fine-tuning AI for smooth cross-device interactions.

## Future Plans
- Support multiple pets in one world.
- Implement a memory system for users to relive moments with their pets.
- Add haptic feedback for a stronger sense of connection.

## How to Run
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Dependencies
Key dependencies:
- `next`
- `three`
- `@react-three/fiber`
- `@react-three/xr`
- `@vercel/blob`
- `elevenlabs`
- `openai`

## License
This project is licensed under the MIT License.
