import { createContext, useEffect, useState } from "react";


export const LanguageContext = createContext();

export const LanguageProvider =({children})=>{
    const [lang , setLang] = useState('en');
    const [dir , setDir] = useState('ltr');

    useEffect(()=>{
        if(lang === 'ar'){
            setDir('rtl');
            document.documentElement.setAttribute('dir' , 'rtl');
        }else{
            setDir('ltr');
            document.documentElement.setAttribute('dir' , 'ltr');
        }
    } , [lang]);

    return (
        <LanguageContext.Provider value={{lang , dir , setLang}}>
            {children}
        </LanguageContext.Provider>
    )
}