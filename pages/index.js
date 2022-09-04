import { useEffect, useState } from 'react';
import ComboTable from './components/ComboTable';
import FormExpand from './components/FormExpand';
import { getMenu, getCombos } from './lib/data';

export default function Home({ menu, initCombos, initMaxPage }) {

  var [combos, setCombos] = useState(initCombos);
  var [page, setPage] = useState(1);
  var [maxPage, setMaxPage] = useState(initMaxPage);

  function loadNextPage() {
    setPage(page + 1);
  }

  useEffect(() => {
    var blocked = false;
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !blocked) {
        if (page < maxPage) {
          loadNextPage();
          blocked = true;
        }
      } else {
        blocked = false;
      }
    });
  }, []);

  useEffect(() => {
    console.log(page);
    fetch(`/api/combos?page=${page}&pagesize=5`)
      .then(x => x.json())
      .then(resp => {
        setCombos(combos.concat(resp.combos));
        setPage(resp.page);
        setMaxPage(resp.maxPage);
      });
  }, [page]);

  // return (
  //   <center>
  //     <ComboTable menu={menu} combos={combos ? combos : initCombos} />
  //     <br/>
  //     <Paginator page={page} maxPage={maxPage ? maxPage : initMaxPage} setPage={(x) => setPage(x)} />
  //   </center>

  return (
    <div id="page_container">
      <h1 id="title">Franklin Templeton Cafe Optimizer</h1>
      <p id="description">Scrapes the menu from the Franklin Templeton Bon Appetit cafe and finds combinations of items that approach $25.</p>
      <FormExpand></FormExpand>
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