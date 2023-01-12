import React, { Component } from "react";
import jsonGenData from './jsonGenData'
import TableInput from './tableInput';
import { useToast } from "./toastprovider";

class UserListTable extends Component {
    state = {
        userList: jsonGenData
    };



    headerTitle = Object.keys(this.state.userList[0]).map(
        (header, index) => header
    );

    renderTableData = () => {
        return this.state.userList.map((table, index) => {
            const { username, email, age, country } = table;
            return (
                <tr>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{age}</td>
                    <td>{country}</td>
                    <td>
                        <button onClick={() => this.onDelete(table)}>Delete</button>
                    </td>
                </tr>
            );
        });
    };


    compareBy = key => {
        return (a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    };

    sortBy = key => {

        let userListCopy = [...this.state.userList];
        userListCopy.sort(this.compareBy(key));
        this.setState({ userList: userListCopy });

    };

    onDelete = rowToBeDeleted => {
        const filteredRows = this.state.userList.filter(item => {
            return item !== rowToBeDeleted;
        });
        this.setState({ userList: filteredRows });
    };

    onAppend = (appendData) => {
        // new CustomEvent('addToast', { content: 'text kakoyto', title: 'turbo text' })
        this.setState({ userList: [...this.state.userList, appendData] })
    }


    render() {

        return (
            <div>
                <TableInput onAppendCallback={this.onAppend} />

                <div className="usersDiv">
                    <table className="users">
                        <thead>
                            <tr>
                                {this.headerTitle.map((item, index) => {
                                    return (
                                        <th key={item} onClick={() => this.sortBy(item)}>
                                            {item.toUpperCase()}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>{this.renderTableData()}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UserListTable;
