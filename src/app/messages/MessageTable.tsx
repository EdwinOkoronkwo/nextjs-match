'use client'

import React from 'react'
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {Card} from "@nextui-org/card";
import MessageTableCell from "@/app/messages/MessageTableCell";
import {useMessages} from "@/hooks/useMessages";

type MessageTableProps = {
    initialMessages: MessageDto[];
}

export default function MessageTable({initialMessages}: MessageTableProps){
    const {columns, isOutbox, isDeleting, deleteMessage, selectRow, messages} = useMessages(initialMessages);

    return (
        <Card
            className={"flex flex-col gap-3 h-[80vh] overflow-auto"}
        >
            <Table aria-label="Example table with dynamic content"
                   selectionMode={"single"}
                   onRowAction={(key) => selectRow(key)}
                   shadow={"none"}
            >
                <TableHeader columns={columns}>
                    {(column) =>
                        <TableColumn key={column.key} width={column.key === 'text' ? '50%' : undefined}>
                            {column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={messages}>
                    {(item) => (
                        <TableRow key={item.id} className={"cursor-pointer"}>
                            {(columnKey) => (
                                <TableCell className={`${!item.dateRead && !isOutbox ? 'font-semibold' : ''}`}>
                                    <MessageTableCell
                                        item={item}
                                        columnKey={columnKey as string}
                                        isOutbox={isOutbox}
                                        deleteMessage={deleteMessage}
                                        isDeleting={isDeleting.loading && isDeleting.id === item.id}
                                        />
                                </TableCell>
                                )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </Card>

    )
}
