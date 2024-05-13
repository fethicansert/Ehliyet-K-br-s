import React, { useMemo } from 'react'

//This function exucute if soru_turu changes
const useSetHeader = (soru_turu) => {
    return useMemo(() => {
        let header;
        switch (soru_turu) {
            case 'karisik':
                header = 'Karışık Levha Soruları';
                break;
            case 'tehlike-ikaz':
                header = 'Tehlike Ve Ikaz Levha Soruları';
                break
            case 'yasak-tahdit':
                header = 'Yasak Ve Tahdit Levha Soruları';
                break
            case 'durma-parketme':
                header = 'Durma Ve Park Etme Levha Soruları';
                break
            case 'bilgi-verici':
                header = 'Bilgi Verici Levha Sorulari';
                break
            case 'otoyol':
                header = 'Otoyol Levha Soruları';
                break
            default:
                break;
        }
        return header;
    }, [soru_turu]);
}

export default useSetHeader
