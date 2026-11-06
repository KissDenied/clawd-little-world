# Clawd frame sequences

Clawd artwork belongs to Anthropic. This is an unofficial fan integration. No
claim is made that the community archives grant ownership of Anthropic art.

## Preserved source frames (not locally invented poses)

- Watering, ConfettiHappy, Spark, Laptop and Desktop: original rectangular
  Lottie exports preserved by Jamieyw/The-Clawd-Museum, assets/animations/acts.
  The museum identifies claude.dev as the source. Held opacity keys, layer
  order, every pose and original 12 fps are decoded, without interpolation.
  https://github.com/Jamieyw/The-Clawd-Museum
- Space: the astronaut pixel table preserved in its assets/sprites/claude-dev.json,
  including every delta frame and 12 fps.
- Soccer and detective: public Anthropic GIFs retrieved from
  https://claude.ai/images/clawd/persona/Clawd-Soccer.gif and
  https://claude.ai/images/clawd/persona/Clawd-Magnifier.gif .
  Every frame is retained. Their alternating 80/90 ms frame delays are kept
  in clawd-original-frames.css, rather than guessed as a generic bouncing ball.

The source JSON/GIF files are available from the upstream links above.
PNG strips are lossless pixel-grid renderings, not redesigned poses.
Body orange/shade are merged to flat #D97757 for this flat-style integration;
prop/eye colours and source frame positions remain as supplied.
At runtime, source sequences use scale(4/3, 5/4) around foot anchor (18,20),
matching a 32x20 neutral silhouette while retaining per-frame pose changes.
Miniature cards share a fixed camera; prop extents no longer shrink the body.

## Explicitly local video redraws (not official exports)

Chef, welding, hero and wizard have no original export located yet. They use
the original plain body frame with discrete video-reference poses, built as separately traced pixel sequences. They are approximations of the observed
video; do not describe them as byte-identical or exact official animations.

- Chef: https://x.com/ClaudeDevs/status/2052818282294726699
  Hat picked up, raised, worn and removed; no invented apron, frying pan or egg.
- Welding: https://x.com/ClaudeDevs/status/2064453497005978031
  Face shield lowered, torch at lower left, sparks only during welding.
- Hero: https://x.com/ClaudeDevs/status/2054351031279186040
  Dark red wrist thrusters, white exhaust and takeoff/landing; no added cape.
- Wizard: https://x.com/ClaudeDevs/status/2056454359685476491
  Bent blue star hat, hand-held wand; no added costume shirt or broom.

These four redraws still require subjective fidelity review. Runtime animation
tests alone establish playback, not visual equivalence to the reference.
