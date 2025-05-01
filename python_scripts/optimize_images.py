import os
import argparse
from PIL import Image

def optimize_image(source_path, dest_path, quality=85):
    """Optimiza una imagen convirtiéndola a WebP y comprimiéndola."""
    try:
        img = Image.open(source_path)
        # Asegurarse de que el directorio de destino exista
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        
        # Construir la ruta de destino con extensión .webp
        base_name = os.path.splitext(os.path.basename(dest_path))[0]
        webp_dest_path = os.path.join(os.path.dirname(dest_path), f"{base_name}.webp")
        
        img.save(webp_dest_path, 'webp', quality=quality)
        print(f"Imagen optimizada y guardada como: {webp_dest_path}")
        return True
    except Exception as e:
        print(f"Error al optimizar {source_path}: {e}")
        return False

def process_directory(source_dir, dest_dir, quality=85):
    """Procesa todas las imágenes en un directorio."""
    if not os.path.isdir(source_dir):
        print(f"Error: El directorio fuente '{source_dir}' no existe.")
        return

    os.makedirs(dest_dir, exist_ok=True)
    
    supported_formats = ('.jpg', '.jpeg', '.png')
    optimized_count = 0
    error_count = 0

    for item in os.listdir(source_dir):
        source_item_path = os.path.join(source_dir, item)
        dest_item_path = os.path.join(dest_dir, item)

        if os.path.isfile(source_item_path) and item.lower().endswith(supported_formats):
            if optimize_image(source_item_path, dest_item_path, quality):
                optimized_count += 1
            else:
                error_count += 1
        elif os.path.isdir(source_item_path):
            # Opcional: Procesar subdirectorios recursivamente
            # process_directory(source_item_path, dest_item_path, quality)
            pass # Por ahora, ignoramos subdirectorios

    print(f"\nProceso completado.")
    print(f"Imágenes optimizadas: {optimized_count}")
    print(f"Errores: {error_count}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Optimiza imágenes convirtiéndolas a WebP.')
    parser.add_argument('source_dir', type=str, help='Directorio con las imágenes originales.')
    parser.add_argument('dest_dir', type=str, help='Directorio donde guardar las imágenes optimizadas.')
    parser.add_argument('--quality', type=int, default=85, help='Calidad de compresión WebP (0-100). Por defecto: 85.')

    args = parser.parse_args()

    if not (0 <= args.quality <= 100):
        print("Error: La calidad debe estar entre 0 y 100.")
    else:
        process_directory(args.source_dir, args.dest_dir, args.quality)