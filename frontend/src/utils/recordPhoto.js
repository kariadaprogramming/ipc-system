import API_BASE_URL from '../config';

const UPLOAD_FOLDERS = {
    prestasi: 'prestasi',
    event: 'event',
    organisasi: 'organisasi',
    pelanggaran: 'pelanggaran'
};

export function getRecordPhotoUrl(path, type) {
    if (!path) {
        return null;
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    const base = API_BASE_URL.replace('/api', '');
    let cleanPath = path;

    if (path.includes('\\') || /^[A-Za-z]:/.test(path)) {
        const filename = path.split('\\').pop().split('/').pop();
        const folder = path.includes('approvals')
            ? 'approvals'
            : (UPLOAD_FOLDERS[type] || 'approvals');
        cleanPath = `/uploads/${folder}/${filename}`;
    } else if (path.startsWith('/uploads/')) {
        cleanPath = path;
    } else if (path.startsWith('uploads/')) {
        cleanPath = `/${path}`;
    } else {
        const folder = path.includes('approvals') ? 'approvals' : (UPLOAD_FOLDERS[type] || 'approvals');
        cleanPath = `/uploads/${folder}/${path}`;
    }

    return `${base}${cleanPath}`;
}
