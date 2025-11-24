import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'powerLevel',
  standalone: true
})
export class PowerLevelPipe implements PipeTransform {
  transform(value: any): string {
    if (value === null || value === undefined || value === '') {
      return 'Desconhecido';
    }

    // Converte para número
    const valueString = String(value);
    const cleanValue = valueString.replace(/[^\d.,]/g, '');
    const normalizedValue = cleanValue.replace(',', '.');
    const power = parseFloat(normalizedValue);

    if (isNaN(power)) {
      console.warn('Valor de poder não é numérico:', value);
      return 'Desconhecido';
    }

    // Classifica o nível de poder
    if (power >= 1000000000) return 'DEUS DA DESTRUIÇÃO';
    if (power >= 100000000) return 'ANJO';
    if (power >= 10000000) return 'LENDÁRIO';
    if (power >= 1000000) return 'ULTRA INSTINTO';
    if (power >= 500000) return 'SUPER SAIYAJIN BLUE';
    if (power >= 100000) return 'SUPER SAIYAJIN GOD';
    if (power >= 50000) return 'SUPER SAIYAJIN 3';
    if (power >= 10000) return 'SUPER SAIYAJIN 2';
    if (power >= 1000) return 'SUPER SAIYAJIN';
    if (power >= 100) return 'TREINADO';
    
    return 'NORMAL';
  }
}