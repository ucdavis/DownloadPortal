import * as React from 'react';

interface IIconProps {
    fileName: string
}

export const FileIcon = (props: IIconProps) => {
    const { fileName } = props;
    const splitFile = fileName.split('.');

    // in case we have an extensionless file
    if (splitFile.length === 1) return <i className="fa fa-file" />;

    const extension = splitFile[splitFile.length - 1];

    let icon;

    switch (extension) {
        case 'txt':
        case 'md':
            icon = 'fa-file-text-o';
            break;
        case 'png':
        case 'jpg':
        case 'gif':
            icon = 'fa-file-image-o';
            break;
        case 'zip':
        case 'gz':
        case 'tar':
            icon = 'fa-file-archive-o';
            break;
        default:
            icon = 'fa-file-o';
    }

    return <i className={`fa ${icon}`} />;
}