import { FC } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PdfView from './PdfView';
import 'react-tabs/style/react-tabs.css';
interface TabsProps {
    titles: string[]
    pdfs: ArrayBufferLike[] | null
}

const TabsWrapper: FC<TabsProps> = ({ titles, pdfs }) => {
    return (
        <div className="tabs-wrapper">
            <Tabs >
                <TabList>
                    {titles.map((title, index) => (
                        <Tab className={'btn btn-primary-white'} selectedClassName='active' key={`title-tab-${index}`}>{title}</Tab>
                    ))}
                </TabList>
                {pdfs ? pdfs.map((pdf, index) => (
                    <TabPanel key={`pdf-panel-${index}`}>
                        <PdfView pdfUrl={pdf} />
                    </TabPanel>
                )) : titles.map((title, index) => (
                    <TabPanel key={`pdf-panel-${index}`}>
                    </TabPanel>)
                )}
            </Tabs>
        </div>
    );
}

export default TabsWrapper;