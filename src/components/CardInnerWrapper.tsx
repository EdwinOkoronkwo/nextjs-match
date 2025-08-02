import React, {ReactNode} from 'react'
import {CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/react";

type CardInnerProps = {
    header: ReactNode | string;
    body: ReactNode;
    footer?: ReactNode;
}

export default function CardInnerWrapper({header, body, footer}: CardInnerProps) {
    return (
        <>
            <CardHeader>
                {typeof header === "string" ? (
                    <div className="text-2xl font-semibold text-secondary">
                        {header}
                    </div>
                ): (
                    <>{header}</>
                )}
            </CardHeader>
            <Divider />
            <CardBody>
                {body}
            </CardBody>
            {footer && (
                <CardFooter>
                    {footer}
                </CardFooter>
            )}
        </>
    )
}
