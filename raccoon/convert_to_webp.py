#!/usr/bin/env python3
"""
Convert all meme images to WebP format and update memes.json
"""

import json
import os
import subprocess
from pathlib import Path

def convert_to_webp():
    """Convert all images to WebP and update memes.json"""
    
    images_dir = Path("images")
    if not images_dir.exists():
        print("❌ images/ folder not found!")
        return
    
    # Get all image files
    image_files = list(images_dir.glob("meme*.*"))
    
    if not image_files:
        print("❌ No meme images found in images/")
        return
    
    print(f"Found {len(image_files)} images to convert")
    
    # Convert each image to WebP
    converted = []
    for img in image_files:
        # Skip if already WebP
        if img.suffix.lower() == '.webp':
            print(f"  ⏭️  Skipping {img.name} (already WebP)")
            converted.append(img.name)
            continue
        
        # New WebP filename
        webp_name = img.stem + '.webp'
        webp_path = images_dir / webp_name
        
        print(f"  Converting: {img.name} → {webp_name}")
        
        # Convert using ImageMagick
        try:
            subprocess.run(
                ['magick', str(img), '-quality', '85', str(webp_path)],
                check=True,
                capture_output=True
            )
            
            # Delete original file
            img.unlink()
            converted.append(webp_name)
            
        except subprocess.CalledProcessError as e:
            print(f"  ⚠️  Failed to convert {img.name}: {e}")
            # Keep the original if conversion fails
            converted.append(img.name)
    
    # Update memes.json
    if os.path.exists("memes.json"):
        with open("memes.json", 'r') as f:
            memes = json.load(f)
        
        # Update URLs to use .webp
        for meme in memes:
            old_url = meme['url']
            filename = old_url.split('/')[-1]
            
            # Change extension to .webp
            base = filename.rsplit('.', 1)[0]
            new_filename = f"{base}.webp"
            
            meme['url'] = f"./images/{new_filename}"
        
        # Save updated JSON
        with open("memes.json", 'w', encoding='utf-8') as f:
            json.dump(memes, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Converted {len(converted)} images to WebP")
        print(f"✅ Updated memes.json")
    else:
        print("⚠️  memes.json not found - skipping JSON update")

if __name__ == "__main__":
    convert_to_webp()
