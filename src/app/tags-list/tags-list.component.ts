import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Tag } from './Tag';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css'],
})

export class TagsListComponent implements OnInit {
  tags: any[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  constructor(private tagService: TagService, private announcer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.tagService.getTags()
      .subscribe(tags => this.tags = tags);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const newTag: Tag = { value: `#${value}` }; // Ajouter "#" avant la valeur du tag
      this.tagService.addTag(newTag).subscribe(() => {
        this.tags.push(newTag); // Ajouter le tag à la liste
        event.chipInput!.clear();
      });
    }
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      const tagId = tag.tag_index; // Supposons que chaque tag a un identifiant unique 'id'
      this.tagService.deleteTag(tagId).subscribe(() => {
        this.tags.splice(index, 1);
        this.announcer.announce(`Removed ${tag}`);
      });
    }
  }

  edit(tag: any, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(tag);
      return;
    }
    const tagId = tag.tag_index; // Supposons que chaque tag a un identifiant unique 'id'
    this.tagService.updateTag(tagId, { value: value }).subscribe(updatedTag => {
      const index = this.tags.indexOf(tag);
      if (index >= 0) {
        this.tags[index].value = `#${value}`;
      }
    });
  }
}
