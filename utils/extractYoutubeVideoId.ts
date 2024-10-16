export function extractYouTubevideoId(url: string): string | null {
    const matched =
        /^https?:\/\/(www\.)?youtube\.com\/watch\?(.*&)?v=([^&]+)/.exec(url) ??
        /^https?:\/\/youtu\.be\/([^?]+)/.exec(url) ??
        /^https?:\/\/(www\.)?youtube\.com\/embed\/([^?]+)/.exec(url);
    
    if (matched && matched[1]) {
        return matched[1];
    } else {
        return null;
    }
}
