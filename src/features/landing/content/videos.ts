// Demonstration videos. Add one with either a YouTube id (unlisted works)
// or a file in /public/videos (mp4). While the list is empty, the section
// shows only the interactive demo.
export type DemoVideo = {
  /** Stable id, used in analytics ("video_play:<id>"). */
  id: string;
  title: string;
  description: string;
  /** e.g. "1:30" */
  duration: string;
  youtubeId?: string;
  /** e.g. /videos/reservas.mp4 */
  src?: string;
  /** Poster image (defaults to the YouTube thumbnail). */
  poster?: string;
  /** ISO 8601 upload date, for search engines (VideoObject). */
  uploadDate: string;
};

export const DEMO_VIDEOS: DemoVideo[] = [];
