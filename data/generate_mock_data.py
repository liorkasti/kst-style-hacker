import json
import random

# Data sources
types = ["shoes", "shirt", "pants"]
colors = ["black", "white", "red", "green", "pink"]
brands = ["Tommy Hilfiger", "Calvin Klein", "GAP", "Lacoste", "Lee Cooper"]
sizes_shoes = [i for i in range(35, 47)]  # sizes 35 to 46
sizes_shirts = ["S", "M", "L", "XL", "XXL"]
sizes_pants = [i for i in range(30, 51)]  # sizes 30 to 50
image_url = "https://via.placeholder.com/100"

clothes = []

for i in range(1, 201):
    item_type = random.choice(types)
    color = random.choice(colors)
    brand = random.choice(brands)
    
    if item_type == "shoes":
        size = random.choice(sizes_shoes)
    elif item_type == "shirt":
        size = random.choice(sizes_shirts)
    elif item_type == "pants":
        size = random.choice(sizes_pants)
    
    clothes.append({
        "id": i,
        "type": item_type,
        "color": color,
        "size": size,
        "brand": brand,
        "image": image_url
    })

data = {"clothes": clothes}

# Save to JSON file
with open('mock_data.json', 'w') as f:
    json.dump(data, f, indent=4)

print("Mock data generated and saved to mock_data.json")
