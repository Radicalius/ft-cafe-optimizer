import ComboList from "./ComboList"

export default function ComboTable({ combos, menu }) {
    const rows = combos.map(x => (
        <tr class='combo-table-row'>
            <td className="combo-table-row-list"><ComboList meals={x[0]} menu={menu} /></td>
            <td className="combo-table-row-price">${x[1].toFixed(2)}</td>
        </tr>
    ))
    
    return (
        <table className="combo-table">
            <thead>
                <tr>
                    <td className="combo-table-header">Items</td>
                    <td className="combo-table-header">Price</td>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}