import { Head } from '@inertiajs/react';
import TemplateOne from './Templates/TemplateOne';
import TemplateTwo from './Templates/TemplateTwo';
import TemplateThree from './Templates/TemplateThree';

/**
 * Layout Switcher — memilih template berdasarkan portfolio.layout_template.
 */
export default function PortfolioShow({ portfolio }) {
    const renderTemplate = () => {
        switch (portfolio.layout_template) {
            case 'layout_2':
                return <TemplateTwo portfolio={portfolio} />;
            case 'layout_3':
                return <TemplateThree portfolio={portfolio} />;
            case 'layout_1':
            default:
                return <TemplateOne portfolio={portfolio} />;
        }
    };

    return (
        <>
            <Head>
                <title>{portfolio.nama_usaha}</title>
                <meta name="description" content={portfolio.bio_deskripsi?.substring(0, 160)} />
            </Head>
            {renderTemplate()}
        </>
    );
}
