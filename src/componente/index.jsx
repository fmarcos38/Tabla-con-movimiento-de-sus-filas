import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './estilos.css';

const ItemType = 'PRODUCT';

const initialProducts = [
    { id: '1', name: 'Producto 1', price: 100 },
    { id: '2', name: 'Producto 2', price: 200 },
    { id: '3', name: 'Producto 3', price: 300 },
    // Añade más productos según sea necesario
];

const ProductRow = ({ product, index, moveRow }) => {
    const [, ref] = useDrag({
        type: ItemType,
        item: { index },
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveRow(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <tr ref={(node) => ref(drop(node))}>
            <td>{product.name}</td>
            <td>{product.price}</td>
        </tr>
    );
};

const ProductTable = () => {
    const [products, setProducts] = useState(initialProducts);

    const moveRow = (fromIndex, toIndex) => {
        const updatedProducts = [...products];
        const [movedItem] = updatedProducts.splice(fromIndex, 1);
        updatedProducts.splice(toIndex, 0, movedItem);
        setProducts(updatedProducts);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <ProductRow
                            key={product.id}
                            index={index}
                            product={product}
                            moveRow={moveRow}
                        />
                    ))}
                </tbody>
            </table>
        </DndProvider>
    );
};

export default ProductTable;


