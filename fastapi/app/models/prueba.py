from webdriver_manager.chrome import ChromeDriverManager

from selenium import webdriver
from selenium.webdriver import Chrome
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

import time
import random as rdm

def main(message: str):
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-extensions")
    options.add_argument("--window-size=1920,1080")
    driver = Chrome(service=service, options=options)

    driver.get("https://automatroni.com/productos")
    time.sleep(rdm.uniform(2, 5))

    # BUSCAMOS EL BOTON DE BUSQUEDA E IMPORTAMOS EL CONTENIDO AL INPUT DEL SEARCH
    formulario_search = driver.find_element(By.ID, "form_buscador")
    formulario_search.find_element(By.ID, "descripcion").send_keys(message)
    time.sleep(2)

    formulario_search.find_element(By.TAG_NAME, "button").click()
    time.sleep(rdm.uniform(1, 3))

    # DESPUÉS DE REALIZAR LA BÚSQUEDA OBTENEMOS TODOS LAS ETIQUETAS LI
    catalogo = WebDriverWait(driver, 30).until(
        EC.visibility_of_element_located((By.ID, "catalogo"))
    )
    eti_ol = catalogo.find_element(By.CLASS_NAME, "list_products")
    divs = eti_ol.find_elements(By.CLASS_NAME, "list_products--card")

    resultados = []
    for div in divs:
        name_title = div.find_element(By.CLASS_NAME, "title")
        price = div.find_element(By.CLASS_NAME, "price")
        eti_ul = div.find_element(By.TAG_NAME, "ul")
        eti_lis = eti_ul.find_elements(By.TAG_NAME, "li")
        name_type = eti_lis[2]

        resultados.append({
            "title": name_title.text,
            "price": price.text,
            "type": name_type.text
        })

    driver.quit()
    return resultados
