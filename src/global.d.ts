import { MessageFormatElement } from 'intl-messageformat-parser';

export interface Props {
    children?: JSX.Element | string;
};

export interface AppSettings {
    loadInitialData: boolean,
    name: string;
    locale: string;
    messages: Record<string, MessageFormatElement[]>
}

export interface AppContextInterface {
    appSettings: AppSettings,
    dispatch: React.Dispatch<any>
}