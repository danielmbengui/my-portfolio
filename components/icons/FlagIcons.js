import React from 'react';
import { FR, GB, IT, AO, CH, PT } from "country-flag-icons/react/3x2";
import { DEFAULT_LANGAGE, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_ITALIAN, LANGAGE_PORTUGUESE, LANGAGE_LINGALA } from '../../_mocks_/_settings_items_';

export const FlagIcon = ({ fill, size, height, width, lang, ...props }) => {
    function getFlag(_lang) {
        switch (_lang) {
            case LANGAGE_ENGLISH:
                return (
                    <GB
        //title={t('langEnglish')}
        style={{
            //cursor: 'pointer',
            //border: langage === 'fr' ? '3px solid var(--primary)' : '',
            borderRadius: '50%',
            width: 30,
            height: 30
        }}
        />
                )
                case LANGAGE_FRENCH:
                    return (
                        <FR
            //title={t('langEnglish')}
            style={{
                //cursor: 'pointer',
                //border: langage === 'fr' ? '3px solid var(--primary)' : '',
                borderRadius: '50%',
                width: 30,
                height: 30
            }}
            />
                    )
        
                    case LANGAGE_ITALIAN:
                return (
                    <IT
        style={{
            borderRadius: '50%',
            width: 30,
            height: 30
        }}
        />
                )
                case LANGAGE_PORTUGUESE:
                return (
                    <PT
        //title={t('langEnglish')}
        style={{
            //cursor: 'pointer',
            //border: langage === 'fr' ? '3px solid var(--primary)' : '',
            borderRadius: '50%',
            width: 30,
            height: 30
        }}
        />
                )
                case LANGAGE_LINGALA:
                return (
                    <AO
        style={{
            borderRadius: '50%',
            width: 30,
            height: 30
        }}
        />
                )
            default:
                return (
                    <GB
        //title={t('langEnglish')}
        style={{
            //cursor: 'pointer',
            //border: langage === 'fr' ? '3px solid var(--primary)' : '',
            borderRadius: '50%',
            width: size,
            height: size
        }}
        />
                )
        }
    }
    return (
        <>
        {
            getFlag(lang)
        }
        </>
    );
  };

  export const FrenchIcon = ({ size = 30, ...props }) => {
    return (
        <FR
            //title={t('langEnglish')}
            {...props}
            style={{
                borderRadius: '50%',
                width: size,
                height: size
            }}
            />
    );
  };

  export const EnglishIcon = ({ size = 30, ...props }) => {
    return (
        <GB
            //title={t('langEnglish')}
            {...props}
            style={{
                borderRadius: '50%',
                width: size,
                height: size
            }}
            />
    );
  };

  export const ItalianIcon = ({ size = 30, ...props }) => {
    return (
        <IT
            //title={t('langEnglish')}
            {...props}
            style={{
                borderRadius: '50%',
                width: size,
                height: size
            }}
            />
    );
  };


  export const AngolanIcon = ({ size = 30, ...props }) => {
    return (
        <AO
            //title={t('langEnglish')}
            {...props}
            style={{
                borderRadius: '50%',
                width: size,
                height: size
            }}
            />
    );
  };

  export const SwissIcon = ({ size = 30, ...props }) => {
    return (
      <CH
            //title={t('langEnglish')}
            {...props}
            style={{
                borderRadius: '50%',
                width: size,
                height: size
            }}
      />
    );
  };

  export const PortugueseIcon = ({ size = 30, ...props }) => {
    return (
      <PT
            {...props}
            style={{
                borderRadius: '50%',
                width: size,
                height: size
            }}
      />
    );
  };

  export function getFlag(lang = DEFAULT_LANGAGE) {
    switch(lang) {
        case LANGAGE_FRENCH:
        case 'fr':
            return(<FrenchIcon />)
        case LANGAGE_ENGLISH:
        case 'en':
            return(<EnglishIcon />)
        case LANGAGE_ITALIAN:
        case 'it':
            return(<ItalianIcon />)
        case LANGAGE_LINGALA:
        case 'ao':
            return(<AngolanIcon />)
        case LANGAGE_PORTUGUESE:
        case 'pt':
            return(<PortugueseIcon />)
        default:
            return(<FrenchIcon />)
    }
  }
  