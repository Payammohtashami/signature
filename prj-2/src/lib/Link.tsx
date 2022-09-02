import { withRouter } from 'next/router';
import BeforeLink from 'next/link'
import React, { Children, JSXElementConstructor } from 'react';

interface LinkFunctionType {
    scroll?: any
    router: any
    href: any
    className?: any
    children?: any
    onClick?: any
}
const Link = ({ children, className, router, href, scroll, ...props }: LinkFunctionType) => {
    return <BeforeLink href={href}  {...{ scroll }} ><a className={className} {...props}>{children}</a></BeforeLink>;
};

export default withRouter(Link);