import requests
from bs4 import BeautifulSoup


def scrape_ft_cafe_menu(cafe_name):
    res = []

    text = requests.get(f'https://franklintempletonsm.cafebonappetit.com/cafe/{cafe_name}').text
    doc = BeautifulSoup(text, features='html.parser')

    for i in doc.select('.site-panel__daypart-item-container'):
        title = i.select_one('.site-panel__daypart-item-title').text.strip()
        desc = i.select_one('.site-panel__daypart-item-description')
        if desc:
            desc = desc.text.strip()
        if i.select_one('.price-item__amount'):
            price = float(i.select_one('.price-item__amount').text.strip().split('/')[-1])
            res.append([title, desc, price])

    return res

menu = scrape_ft_cafe_menu('park-place-cafe') + scrape_ft_cafe_menu('park-east-cafe')
min_price = min([int(i[2]) for i in menu])

def brute_force(menu, current, cost):
    if cost < 0:
        return []
    if cost < min_price:
        return [(current, 25-cost)]
    return sum([brute_force(menu[j:], current + [item[0]], cost - item[2]) for j,item in enumerate(menu)], [])

a = brute_force(menu, [], 25)
print(a[:5])
