# generate_fake_houses.py
from faker import Faker
import random
import pandas as pd
from datetime import datetime

fake = Faker()
num_samples = 1000

data = []

for _ in range(num_samples):
    area = random.randint(500, 4000)
    bedrooms = random.randint(1, 5)
    bathrooms = random.randint(1, 4)
    stories = random.randint(1, 3)
    location = fake.city()
    year_built = random.randint(1980, 2023)
    age = datetime.now().year - year_built

    # Price formula (base + noise)
    price = (
        (area * 3000)
        + (bedrooms * 500000)
        + (bathrooms * 300000)
        + (stories * 200000)
        - (age * 10000)
        + random.randint(-200000, 200000)
    )

    data.append({
        "house_id": _ + 1,
        "area_sqft": area,
        "bedrooms": bedrooms,
        "bathrooms": bathrooms,
        "stories": stories,
        "location": location,
        "year_built": year_built,
        "price": round(price, 2)
    })

df = pd.DataFrame(data)
df.to_csv("house_data.csv", index=False)
print("✅ house_data.csv generated with", num_samples, "rows")
