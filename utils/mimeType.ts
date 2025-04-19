
export const getMimeType = (uri: string ) => {
    const extension = uri?.split('.').pop()!.toLowerCase();
    
    const mimeTypes: Record<string, string> = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
    };

    return mimeTypes[extension ?? ''] || 'application/octet-stream';
}