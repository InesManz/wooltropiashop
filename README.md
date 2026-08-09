# Wooltropia Shop

Mi entrega del **Proyecto 2 – ReactJS**. Una tienda de cuencos de lana (yarn bowls) y accesorios de tejido, en cerámica e impresión 3D.

Stack: React + Vite, react-router-dom, Context API, react-hook-form, Tailwind y json-server para la API.

## Arrancar

```bash
npm install
npm run dev:full   # API (:3001) + web (:5173)
```

Si solo lanzo `npm run dev`, la web tira igual: hace fallback al JSON local.

## Estructura

- `src/api` — llamadas a la API
- `src/components` — componentes reutilizables
- `src/context` — carrito global (useContext)
- `src/hooks` — `useFetch`
- `src/pages` — Home, Tienda, Producto, Carrito, Checkout, Dashboard, 404
- `db.json` — datos de la API (json-server)

## Qué cumple del enunciado

- Responsive en toda la web
- 6 rutas con react-router-dom
- API REST propia (json-server) consumida con `fetch` + `useEffect`
- Estado global con `useContext` y varios `useState`
- Custom hook (`useFetch`)
- Formulario con react-hook-form (checkout)
- Componentes reutilizables y sin re-renders de más (`memo`, `useCallback`, `useMemo`)

## Entrega

Repo público + correo a antonio.rosales@thepower.education con el asunto "Proyecto 2 - ReactJS - Inés Manzano Peinado".
