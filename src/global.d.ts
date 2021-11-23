import { MessageFormatElement } from 'intl-messageformat-parser';

export interface Props {
    children?: JSX.Element;
};

export interface AppSettings {
    loadInitialData: boolean,
    name: string;
    locale: string;
    messages: Record<string, MessageFormatElement[]>
}

export interface AppContextInterface {
    appSettings: AppSettings,
    setAppSettings: React.Dispatch<React.SetStateAction<AppSettings>>
}