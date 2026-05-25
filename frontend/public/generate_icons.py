import struct
import zlib


def save_png(filename, size, color):
    width, height = size
    r, g, b, a = color
    data = bytearray()
    for y in range(height):
        data.append(0)
        for x in range(width):
            data.extend([r, g, b, a])

    def chunk(tag, data_bytes):
        chunk_data = tag.encode('ascii') + data_bytes
        return struct.pack('!I', len(data_bytes)) + chunk_data + struct.pack('!I', zlib.crc32(chunk_data) & 0xffffffff)

    png = b'\x89PNG\r\n\x1a\n'
    png += chunk('IHDR', struct.pack('!IIBBBBB', width, height, 8, 6, 0, 0, 0))
    png += chunk('IDAT', zlib.compress(bytes(data), 9))
    png += chunk('IEND', b'')

    with open(filename, 'wb') as f:
        f.write(png)


save_png('icon-192.png', (192, 192), (59, 130, 246, 255))
save_png('icon-512.png', (512, 512), (59, 130, 246, 255))
print('Created icon-192.png and icon-512.png')
