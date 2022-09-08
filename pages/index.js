import { useEffect, useState } from 'react';
import ComboTable from './components/ComboTable';
import FormExpand from './components/FormExpand';
import Toggle from './components/form/Toggle';
import { getMenu, getCombos } from './lib/data';

export default function Home({ menu, initCombos, initMaxPage }) {

  var [combos, setCombos] = useState(initCombos);
  var [page, setPage] = useState(1);
  var [maxPage, setMaxPage] = useState(initMaxPage);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [allowBreakfast, setAllowBreakfast] = useState(false);
  const [allowLunch, setAllowLunch] = useState(true);

  // useEffect(() => {
  //   var blocked = false;
  //   window.addEventListener('scroll', () => {
  //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !blocked) {
  //       if (page < maxPage) {
  //         loadNextPage();
  //         blocked = true;
  //       }
  //     } else {
  //       blocked = false;
  //     }
  //   });
  // }, []);

  useEffect(() => {
    fetch(`/api/combos?page=${page}&pagesize=5&distinct=${!allowDuplicates}&includeBreakfast=${allowBreakfast}&includeLunch=${allowLunch}`)
      .then(x => x.json())
      .then(resp => {
        setCombos(resp.combos);
        setPage(resp.page);
        setMaxPage(resp.maxPage);
      });
  }, [page, allowDuplicates, allowBreakfast, allowLunch]);

  return (
    <div id="page_container">
      <h1 id="title">Franklin Templeton Cafe Optimizer</h1>
      <p id="description">Scrapes the menu from the Franklin Templeton Bon Appetit cafe and finds combinations of items that approach $25 after tax.</p>
      <FormExpand>
        <Toggle label="Allow Duplicates" isActive={allowDuplicates} setActive={(x) => {
          setAllowDuplicates(x);
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
      </FormExpand>
      <ComboTable menu={menu} combos={combos} />
    </div>
  );
}

export async function getServerSideProps() {
  const menu = await getMenu();
  var combos = (await getCombos());
  const maxPage = Math.ceil(combos.length / 5);
  combos = (await getCombos()).slice(0,5);

  return {
    props: {
      menu,
      initCombos: combos,
      initMaxPage: maxPage
    }
  }
}