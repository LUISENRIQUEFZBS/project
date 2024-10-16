
const productos_inicio = [{id:1,nombre:'Galaxy S24 Ultra 1TB de S/7,149 a S/5,999*',src:"https://images.samsung.com/is/image/samsung/assets/pe/2024/landing/galaxy-blue-cel.png?$448_N_PNG$"},
    {id:2,nombre:'¡Ahora con AI! Galaxy A55 128GB a S/1,399*',src:"https://images.samsung.com/is/image/samsung/assets/pe/2024/landing/Framvdfvd269.png?$448_N_PNG$"},
    {id:3,nombre:'Galaxy S24 256GB de S/4,199 a S/3,049*',src:"https://images.samsung.com/is/image/samsung/assets/pe/2024/landing/S24BLUE789.png?$448_N_PNG$"}];

const mobiles=  [{id:1,nombre:'Galaxy S24 Ultra 1TB de S/7,149 a S/5,999*',src:"https://images.samsung.com/is/image/samsung/assets/pe/2024/landing/galaxy-blue-cel.png?$448_N_PNG$"},
        {id:2,nombre:'¡Ahora con AI! Galaxy A55 128GB a S/1,399*',src:"https://images.samsung.com/is/image/samsung/assets/pe/2024/landing/Framvdfvd269.png?$448_N_PNG$"},
        {id:3,nombre:'Galaxy S24 256GB de S/4,199 a S/3,049*',src:"https://images.samsung.com/is/image/samsung/assets/pe/2024/landing/S24BLUE789.png?$448_N_PNG$"}];

const tv_audios=  [{id:1,nombre:'50" Neo QLED 4K QN90D Tizen OS Smart TV (2024)',src:"https://images.samsung.com/is/image/samsung/p6pim/pe/qn50qn90dagxpe/gallery/pe-qled-qn90d-qn50qn90dagxpe-542572166?$650_519_PNG$"},
    {id:2,nombre:'65" Neo QLED 8K QN800D Tizen OS Smart TV (2024)',src:"https://images.samsung.com/is/image/samsung/p6pim/pe/qn65qn800dgxpe/gallery/pe-qled-qn800d-qn65qn800dgxpe-543203299?$650_519_PNG$"},
    {id:3,nombre:'Combo Samsung 75" Neo QLED 8K Mini LED QN75QN800CGXPE + Soundbar HW-Q800C',src:"https://images.samsung.com/is/image/samsung/p6pim/pe/f-qn75qn800-23/gallery/pe-bundle-samsung-neo-qled-8k-mini-led__-soundbar-hw-q800c-f-qn75qn800-23-536775888?$650_519_PNG$"}];

const electrodomesticos=  [{id:1,nombre:'Lavaseca Bespoke AI 26Kg/15Kg',src:"https://images.samsung.com/is/image/samsung/p6pim/pe/wd26db8995bzpe/gallery/pe-wd8000dk-wd26db8995bzpe-thumb-542691846?$252_252_PNG$"},
        {id:2,nombre:'Lavadora EcoBubble™ 13kg Negro',src:"https://images.samsung.com/is/image/samsung/p6pim/pe/wd20t6000gp-pe/gallery/pe-wd6000t-wd22t6500gvco-506207-wd20t6000gp-pe-thumb-541443770?$252_252_PNG$"},
        {id:3,nombre:'Lavadora EcoBubble™ 18kg Gris',src:"https://images.samsung.com/is/image/samsung/p6pim/pe/wa18cg6441bdpe/gallery/pe-wa6000c-503535-wa18cg6441bdpe-thumb-540946696?$252_252_PNG$"}];
        
const tecnologia_ais=  [{id:1,nombre:'Desde s/ 305.50 al mes en 18 cuotas sin intereses* o S/ 5,499.00',src:"https://images.samsung.com/is/image/samsung/p6pim/pe/sm-f741blbkpeo/gallery/pe-galaxy-zflip6-f741-sm-f741blbkpeo-thumb-543214290?$172_172_PNG$"},
            {id:2,nombre:'Galaxy Z Fold4 512GB + Watch4 40mm Black',src:"https://images.samsung.com/is/image/samsung/p6pim/pe/f-smf936bza-02/gallery/pe-mx-combo-zfold-and-watch-f-smf936bza-02-thumb-534814407?$172_172_PNG$"},
            {id:3,nombre:'Galaxy Z Fold6',src:"https://images.samsung.com/is/image/samsung/p6pim/pe/sm-f956bzsvpeo/gallery/pe-galaxy-z-fold6-f956-sm-f956bzsvpeo-thumb-543216135?$172_172_PNG$"}];
            

exports.getProductosBienvenido = async (req, res, next) => {
    res.render('bienvenida', {prods: productos_inicio, titulo: 'bienvenida', path: '/',user:  res.locals.user? res.locals.user:null });
}
exports.getProductosMobile = async (req, res, next) => {
    res.render('productos', { prods: mobiles, titulo: 'mobile',title_productos:'Mobiles', path: '/' ,user:  res.locals.user? res.locals.user:null });
}
exports.getProductosTvaudio = async (req, res, next) => {
    res.render('productos', { prods: tv_audios, titulo: 'tv audios',title_productos:'TV Audios', path: '/' ,user:  res.locals.user? res.locals.user:null });
}
exports.getProductosElectrodomesticos = async (req, res, next) => {
    res.render('productos', { prods: electrodomesticos, titulo: 'Electrodomesticos',title_productos:'Electrodomesticos', path: '/' ,user:  res.locals.user? res.locals.user:null });
}
exports.getProductosTecnologiaai = async (req, res, next) => {
    res.render('productos', { prods: tecnologia_ais, titulo: 'Tecnologia-ai',title_productos:'Tecnologia AI', path: '/' ,user:  res.locals.user? res.locals.user:null });
}
exports.getProductosVentasespeciales = async (req, res, next) => {
    res.render('productos', { prods: mobiles, titulo: 'Ventas-especiales',title_productos:'Ventas especiales', path: '/' ,user:  res.locals.user? res.locals.user:null });
}