export default function Paginator({ page, maxPage, setPage }) {
    const value = `${page} / ${maxPage}`;
    
    return (
        <div className="paginator-container">
             <button type="button" onClick={() => setPage(page - 1)}>Prev</button>
            <input type="text" size={1} value={value} readOnly />
            <button type="button" onClick={() => setPage(page + 1)}>Next</button>
        </div>
    )
}