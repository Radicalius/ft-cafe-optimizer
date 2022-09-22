import { useEffect, useState } from 'react';
import Head from 'next/head';
import ComboTable from '../components/ComboTable';
import FormExpand from '../components/FormExpand';
import Toggle from '../components/form/Toggle';
import { getMenu, getCombos } from '../lib/data';
import Multiselect from '../components/form/Multiselect';
import { filterDistinct } from '../lib/filters';
import { getDateStringOptions, getNextWeekdayDateString } from '../lib/dateUtil';
import Dropdown from '../components/form/Dropdown';

export default function Home({ initMenu, initCombos, initMaxPage, initDs, dsOptions }) {

  var [combos, setCombos] = useState(initCombos);
  var [page, setPage] = useState(1);
  var [maxPage, setMaxPage] = useState(initMaxPage);
  var [ds, setDs] = useState(initDs);
  var [menu, setMenu] = useState(initMenu);
  var [allowOverLimit, setAllowOverLimit] = useState(false);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [allowBreakfast, setAllowBreakfast] = useState(true);
  const [allowLunch, setAllowLunch] = useState(true);
  const [vegan, setVegan] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [halal, setHalal] = useState(false);
  const [contains, setContains] = useState([]);

  useEffect(() => {
    var locked = false;
    window.addEventListener('scroll', (event) => {
      if (page < maxPage && !locked && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        locked = true;
        setPage(page + 1);
        setTimeout(() => {locked = false}, 100);
      } 
    });
  }, [page]);

  useEffect(() => {

    const tags = {
      "Vegan": vegan, 
      "Vegetarian": vegetarian,
      "Made without Gluten-Containing Ingredients": glutenFree,
      "Halal": halal
    };

    const tagString = Object.keys(tags).filter(x => tags[x]).map(x => `tags=${x}`).join('&');
    const containsString = contains.map(x => `contains=${menu.find(y => y.title === x).id}`).join('&');
    const maxPrice = `maxPrice=${allowOverLimit ? 26 : 25}`

    fetch(`/api/menu?ds=${ds}`)
      .then(x => x.json())
      .then(resp1 => {
        fetch(`/api/combos?page=${page}&pagesize=25&distinct=${!allowDuplicates}&includeBreakfast=${allowBreakfast}&includeLunch=${allowLunch}&${tagString}&${containsString}&ds=${ds}&${maxPrice}`)
          .then(x => x.json())
          .then(resp => {
            setMenu(resp1.menu);
            setCombos(resp.page == 1 ? resp.combos : combos.concat(resp.combos));
            setPage(resp.page);
            setMaxPage(resp.maxPage);
            setDs(resp.ds);
          });
    })
  }, [page, allowDuplicates, allowBreakfast, allowLunch, vegan, vegetarian, glutenFree, halal, contains, ds, allowOverLimit]);

  return (
    <div>
      <Head>
        <title>Franklin Templeton Cafe Optimizer</title>
      </Head>
      <div id="page_container">
        <h1 id="title">Franklin Templeton Cafe Optimizer</h1>
        <p id="description">Scrapes the menu from the Franklin Templeton Bon Appetit cafe and finds combinations of items that approach $25 after tax.</p>
        <div id='search_bar'>
          <span id='multi_select'>
            <Multiselect selectedItems={contains} allItems={menu.map(x => x.title)} setSelected={(x) => {
              setContains(x);
              setPage(1);
            }} />
          </span>
          <Dropdown options={dsOptions} selected={ds} setOption={setDs} />
        </div>
        <FormExpand>
          <Toggle label="Allow Duplicates" isActive={allowDuplicates} setActive={(x) => {
            setAllowDuplicates(x);
            setPage(1);
          }} />
          <Toggle label="Allow > $25" isActive={allowOverLimit} setActive={(x) => {
            setAllowOverLimit(x);
            setPage(1);
          }} />
          <Toggle label="Include Breakfast Options" isActive={allowBreakfast} setActive={(x) => {
            setAllowBreakfast(x);
            setPage(1);
          }} />
          <Toggle label="Include Lunch Options" isActive={allowLunch} setActive={(x) => {
            setAllowLunch(x);
            setPage(1);
          }} />
          <Toggle label="Vegetarian" isActive={vegetarian} setActive={(x) => {
            setVegetarian(x);
            setPage(1);
          }} />
          <Toggle label="Vegan" isActive={vegan} setActive={(x) => {
            setVegan(x);
            setPage(1);
          }} />
          <Toggle label="Gluten Free" isActive={glutenFree} setActive={(x) => {
            setGlutenFree(x);
            setPage(1);
          }} />
          <Toggle label="Halal" isActive={halal} setActive={(x) => {
            setHalal(x);
            setPage(1);
          }} />
        </FormExpand>
        <br/>
        <ComboTable menu={menu} combos={combos} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const initDs = getNextWeekdayDateString();
  const dsOptions = getDateStringOptions();
  const menu = await getMenu(initDs);
  var combos = await getCombos(initDs);
  combos = filterDistinct(combos);
  const maxPage = Math.ceil(combos.length / 25);
  combos = combos.slice(0,25);

  return {
    props: {
      initMenu: menu,
      initCombos: combos,
      initMaxPage: maxPage,
      initDs,
      dsOptions
    }
  }
}