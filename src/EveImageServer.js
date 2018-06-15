export function getTypeIcon(typeId, options = {}) {
    const { size = 64 } = options;
    return `https://image.eveonline.com/Type/${typeId}_${size}.png`
}