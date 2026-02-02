import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'next-i18next';
import { InputBase, NativeSelect, Stack, Typography } from '@mui/material';
import { ARRAY_LANGAGES, GENERAL_FONT_FAMILY, _NAMESPACE_LANGAGE_COMMON_ } from '../../_mocks_/_settings_items_';
import { useLangMode } from '../../contexts/LangModeProvider';
import { getFlag } from '../icons/FlagIcons';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: '0px',
    },
    '& .MuiInputBase-input': {
        borderRadius: 15,
        position: 'relative',
        backgroundColor: 'transparent',
        //border: '1px solid var(--primary)',
        fontSize: 14,
        //padding: '5px 26px 5px 12px',
        //py:'5px',
        //px:'5px',
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '1px',
        paddingBottom: '1px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 15,
            //borderColor: 'var(--primary)',
            border: '2px solid var(--primary)'
            //boxShadow: '0 0 0 0.2rem var(--primary)',
        },
    },
}));


const styleSelect = {
    ".MuiSelect-icon": {
        color: 'var(--primary)'
    },
    ".MuiSelect-select": {
        color: 'var(--primary)',
        fontWeight: 'bold',
        fontSize: 14,
        background: 'transparent',
        "&:hover, &:focus, &:active": {
            background: 'transparent',
            color: 'var(--primary)',
            border: 'none'
        },
    },
};

const MENU_PAPER_CLASS = 'SelectLangage-menuPaper';

const menuSlotProps = {
    paper: {
        className: MENU_PAPER_CLASS,
        sx: {
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0,0,0,0.12)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            mt: 1.5,
        },
        style: { backgroundColor: '#ffffff' },
    },
    list: {
        sx: {
            py: 0.5,
            '& .MuiMenuItem-root': {
                color: '#1a1a1a',
                fontSize: 14,
                fontWeight: 500,
                minHeight: 44,
                '&:hover': {
                    backgroundColor: 'rgba(255, 215, 0, 0.25)',
                    color: '#1a1a1a',
                },
                '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 215, 0, 0.4)',
                    color: '#1a1a1a',
                    fontWeight: 600,
                },
                '&.Mui-selected:hover': {
                    backgroundColor: 'rgba(255, 215, 0, 0.5)',
                    color: '#1a1a1a',
                },
                '&:focus, &:active': {
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    color: '#1a1a1a',
                },
            },
        },
    },
};

// MenuProps : privilégier slotProps ; en v5 on mappe aussi vers PaperProps/MenuListProps pour que les styles s'appliquent
const menuProps = {
    slotProps: menuSlotProps,
    PaperProps: menuSlotProps.paper,
    MenuListProps: menuSlotProps.list,
};

export default function DropdownLangageComponent() {
    const { t, i18n } = useTranslation();

    //const [age, setAge] = useState(lang);

    const [lang, setLang] = useLangMode();
    const langs = ARRAY_LANGAGES.map((lang, index) => {
        return(
            {
                value: lang,
                label:t(`langs.${lang}`),
                icon: getFlag(lang)
            }
        )
    })

    const handleChange = (event) => {
        const _lang = event.target.value;
        if (ARRAY_LANGAGES && ARRAY_LANGAGES.includes(_lang)) {
            i18n.changeLanguage(_lang);
            //document.documentElement.setAttribute(STORAGE_LANG_MODE, _lang);
            setLang(_lang);
            //i18n.changeLanguage(_lang);
            //window.localStorage.setItem(STORAGE_LANG_MODE, _lang);
            //alert(`The new langage is: ${_lang}`);
        }
      };

    useEffect(() => {
       // alert(lang)
    }, [lang])

    return (
        <FormControl variant="standard" size='small'>
        <Select
            aria-label='Select langage'
            id="select-langage"
            value={lang}
            autoWidth
            onChange={handleChange}
            input={<BootstrapInput />}
            sx={styleSelect}
            MenuProps={menuProps}
        >
            {
                ARRAY_LANGAGES && ARRAY_LANGAGES.map((_lang, index) => {
                    return (
                        <MenuItem key={`${_lang}-${index}`} value={_lang}>
                            <Stack direction={'row'} alignItems={'center'} spacing={1} sx={{
                            }}>
                                {
                                    getFlag(_lang)
                                }
                                <Typography sx={{
                                    textTransform:'capitalize',
                                    fontFamily:GENERAL_FONT_FAMILY
                                }}>{t(`langs.${_lang}`, {ns:_NAMESPACE_LANGAGE_COMMON_})}</Typography>
                            </Stack>
                        </MenuItem>
                    )
                })
            }
        </Select>
    </FormControl>
    );
}