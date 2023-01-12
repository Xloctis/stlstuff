import React, { Component, useState } from "react";
import { jsonGenData, jsonGenDataKeys } from './jsonGenData'
import TableInput from './tableInput';
import { useToast } from "./toastprovider";


const UserListTable = (props) => {

    const [userList, setUserList] = useState(jsonGenData);

    const { addToast } = useToast();



    const headerTitle = jsonGenDataKeys

    const renderTableData = () => {

        return userList.map((table, index) => {
            const { username, email, age, country } = table;
            return (
                <tr key={index}>
                    <td>{username}</td>
                    <td className="email"><a href={"mailto:" + email}>{email}</a></td>
                    <td className="age">{age}</td>
                    <td>{country}</td>
                    <td>
                        <button onClick={() => onDelete(table)}>Delete</button>
                    </td>
                </tr>
            );
        });
    };

    const emptyTableData = () => {
        if (!userList.length) return (<p className="emptyTableData">NO DATA</p>)
    }

    const compareBy = key => {
        return (a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    };
    const sortBy = key => {

        setUserList([...userList].sort(compareBy(key)))

    };

    const onDelete = rowToBeDeleted => {
        const filteredRows = userList.filter(item => {
            return item !== rowToBeDeleted;
        });

        setUserList(filteredRows)

        addToast({ text: rowToBeDeleted.username, title: 'Row deleted' });
    };

    const onAppend = (appendData) => {
        setUserList([...userList, appendData])
        addToast({ text: appendData.username, title: 'User added' });
    }




    return (
        <div>
            <TableInput onAppendCallback={onAppend} />
            <div className="usersDiv">
                <table className="users">
                    <thead>
                        <tr>
                            {headerTitle.map((item, index) => {
                                return (
                                    <th key={item} onClick={() => sortBy(item)}>
                                        {item.toUpperCase()}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>{renderTableData()}</tbody>
                </table>
                {emptyTableData()}
            </div>
        </div>
    );

}

export default UserListTable;
