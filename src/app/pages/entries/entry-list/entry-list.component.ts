import { Component, OnInit } from '@angular/core';

import { Entry } from '../shared/entry.model';
import { EntryService} from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private entryService: EntryService ) { }

  ngOnInit(): void {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries.sort((a, b) => b.id - a.id),
      error => console.log(error)
    )
  }

  deleteEntry(entry) {
    const mustDelete = confirm(`Deseja excluir a categoria ${entry.name}?`);

    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        () => {
          this.entries = this.entries.filter(el => el !== entry)
        },
        error => {
          console.log(`Erro ao excluir => ${error}`);
        }
      )
    }
  }

}
