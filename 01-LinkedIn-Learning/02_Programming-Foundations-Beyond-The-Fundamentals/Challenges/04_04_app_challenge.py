miles = input('Enter a distance in miles: ')
# kilometers_value = miles_value * 1.609344

distance_km = float(miles) * 1.609344
print(f'Distance is {round(distance_km, 3)} km')