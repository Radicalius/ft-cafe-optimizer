import { useEffect, useState } from 'react';
import ComboTable from './components/ComboTable';
import Paginator from './components/Paginator';
import { getMenu, getCombos } from './lib/data';

export default function Home({ menu, initCombos, initMaxPage }) {

  const [combos, setCombos] = useState(initCombos);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(initMaxPage);

  useEffect(() => {
    fetch(`/api/combos?page=${page}&pagesize=5`)
      .then(x => x.json())
      .then(resp => {
        setCombos(resp.combos);
        setPage(resp.page);
        setMaxPage(resp.maxPage);
      });
  }, [page]);

  return (
    <center>
      <ComboTable menu={menu} combos={combos ? combos : initCombos} />
      <br/>
      <Paginator page={page} maxPage={maxPage ? maxPage : initMaxPage} setPage={(x) => setPage(x)} />
    </center>
  )
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