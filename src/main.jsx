import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../estilo/style.css'
import '../estilo/cart.css'
import '../estilo/produtosfilter.css'
import '../estilo/animation.css'
import '../estilo/adm/admin.css'
import '../estilo/adm/adminItem.css'
import '../estilo/adm/adminItemForm.css'
import '../estilo/adm/newProduct.css'
import '../estilo/adm/zPurchases.css'
import '../estilo/mybuy/purchases.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
