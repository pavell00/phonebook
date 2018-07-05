import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';

import { User, Employee } from '../_models';
import { UserService, DataService } from '../_services';

@Component({templateUrl: 'phonebook.component.html'})
export class PhonebookComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    items : Employee[];
    selectedEmpolee : Employee;
    source = new LocalDataSource();

    settings = {
        pager: {
          display: true,
          perPage: 5
        },
        actions: {
          custom: [
            {
              name: 'view',
              title: '<i class="fa fa-eye" aria-hidden="true"></i>',
            }
          ],
        },
        add: {
          addButtonContent: '<i class="fa fa-plus"></i>',
          createButtonContent: '<i class="fa fa-check-square"></i>',
          cancelButtonContent: '<i class="fa fa-times-circle"></i>',
        },
        edit: {
          editButtonContent: '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
          saveButtonContent: '<i class="fa fa-check-square"></i>',
          cancelButtonContent: '<i class="fa fa-times-circle"></i>',
        },
        delete: {
          deleteButtonContent: '<i class="fa fa-trash-o" aria-hidden="true"></i>'
          //confirmDelete: true,
        },
        columns: {
          _id: {
            title: 'ID',
            filter: false
          },
          name: {
            title: 'Full Name',
            filter: false
          },
          phone: {
            title: 'Phone',
            filter: false
          },
          email: {
            title: 'Email',
            filter: false
          },
          isActive: {
            title: "Enable",
            filter: false
          }
        }
    }

    constructor(private userService: UserService, private dataService: DataService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.showADUsersList();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    showADUsersList() {
        this.dataService.getADUsers()
        .subscribe( data => {
        this.items = data;
        this.source = new LocalDataSource(this.items);
        });
    }

    onSearch(query: string = '') {
        this.selectedEmpolee = null;
        if (query === '') { this.showADUsersList(); }
        this.source.setFilter([
            // fields we want to include in the search
            {
            field: 'name',
            search: query
            },
            {
            field: 'phone',
            search: query
            },
            {
            field: 'email',
            search: query
            },
            {
            field: 'isActive',
            search: query
            }
        ], false); 
    }

    onSelectRow(e: any) {
        this.selectedEmpolee = e.data;
        //console.log(e.data);
    }
}