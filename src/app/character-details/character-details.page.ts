import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { DbzService, DragonBallCharacter } from '../services/dbz.service';
import { PowerLevelPipe } from '../pipes/power-level-pipe';
import { GlowDirective } from '../directives/glow.directive';

@Component({
  selector: 'app-character-details',
  templateUrl: 'character-details.page.html',
  styleUrls: ['character-details.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    PowerLevelPipe,
    GlowDirective
  ]
})
export class CharacterDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dbzService = inject(DbzService);

  character: DragonBallCharacter | null = null;
  loading = false;
  error: string | null = null;

  ngOnInit() {
    const characterId = this.route.snapshot.paramMap.get('id');
    
    if (characterId) {
      this.loadCharacterDetails(parseInt(characterId));
    } else {
      this.error = 'ID do personagem não encontrado';
    }
  }

  loadCharacterDetails(id: number) {
  this.loading = true;
  this.error = null;

  this.dbzService.getCharacterById(id).subscribe({
    next: (character) => {
      console.log('Personagem recebido:', character);
      console.log('KI:', character.ki, 'Tipo:', typeof character.ki);
      console.log('Max KI:', character.maxKi, 'Tipo:', typeof character.maxKi);
      
      this.character = character;
      this.loading = false;
    },
    error: (err) => {
      this.error = err.message;
      this.loading = false;
    }
  });
}

  // Formata o KI para mostrar números completos
  formatKi(ki: any): string {
  console.log('Formatando KI:', ki, 'Tipo:', typeof ki);
  
  if (ki === null || ki === undefined || ki === '') {
    return '0';
  }

  // Converte para string primeiro
  const kiString = String(ki);
  
  // Remove caracteres não numéricos, exceto ponto e vírgula
  const cleanKi = kiString.replace(/[^\d.,]/g, '');
  
  // Substitui vírgula por ponto para parseFloat
  const normalizedKi = cleanKi.replace(',', '.');
  
  let kiValue: number;

  try {
    kiValue = parseFloat(normalizedKi);
    
    if (isNaN(kiValue)) {
      console.warn('KI não é um número válido:', ki);
      return kiString; // Retorna o original se não conseguir converter
    }
  } catch (error) {
    console.warn('Erro ao converter KI:', ki, error);
    return kiString; // Retorna o original em caso de erro
  }

  // Formata baseado no valor
  if (kiValue === 0) return '0';
  
  if (kiValue >= 1000000000) {
    return (kiValue / 1000000000).toFixed(1) + 'B';
  }
  if (kiValue >= 1000000) {
    return (kiValue / 1000000).toFixed(1) + 'M';
  }
  if (kiValue >= 1000) {
    return (kiValue / 1000).toFixed(1) + 'K';
  }
  
  // Para números menores, mostra com até 2 casas decimais se necessário
  return kiValue % 1 === 0 ? kiValue.toString() : kiValue.toFixed(2);
}

  getRaceColor(race: string): string {
    const raceColors: { [key: string]: string } = {
      'Saiyan': 'danger',
      'Human': 'primary',
      'Namekian': 'success',
      'Frieza Race': 'warning',
      'Android': 'medium',
      'God': 'tertiary',
      'Majin': 'dark'
    };
    
    return raceColors[race] || 'secondary';
  }

  getPowerLevelColor(ki: any): string {
    const power = Number(ki);

    if (isNaN(power)) return 'medium'; // neutro para desconhecido

    if (power > 1000000) return 'danger';
    if (power > 100000) return 'tertiary';
    if (power > 50000) return 'warning';
    if (power > 10000) return 'success';
    return 'primary';
  }

  handleImageError(event: any) {
    console.error('Erro ao carregar imagem');
    event.target.src = 'https://via.placeholder.com/220x220/FF6B00/FFFFFF?text=Imagem+Não+Encontrada';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}