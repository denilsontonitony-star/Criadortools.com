import { SystemMonitor } from './core/SystemMonitor';

/**
 * Função principal - Iniciar a aplicação
 */
async function main(): Promise<void> {
  console.clear();
  console.log('🚀 Criadortools.com - Sistema de Otimização\n');

  const monitor = new SystemMonitor(3000); // Atualiza a cada 3 segundos

  // Exibir informações iniciais
  console.log('📋 INFORMAÇÕES DO SISTEMA:\n');
  const sysInfo = monitor.getSystemInfo();
  console.log(`  • Plataforma: ${sysInfo.platform} (${sysInfo.arch})`);
  console.log(`  • CPUs: ${sysInfo.cpus} núcleos`);
  console.log(`  • Memória Total: ${sysInfo.totalMemory}`);
  console.log(`  • Tempo de atividade: ${sysInfo.uptime}\n`);

  // Exibir informações de CPU
  const cpuInfo = monitor.getCPUInfo();
  console.log(`  • Modelo CPU: ${cpuInfo.model}`);
  console.log(`  • Velocidade: ${cpuInfo.speed}\n`);

  // Iniciar monitoramento contínuo
  monitor.startMonitoring((info) => {
    console.clear();
    console.log(monitor.formatMonitorOutput(info));

    // Alertas de desempenho
    if (info.memoryUsagePercent >= 80) {
      console.log('⚠️  ALERTA: Uso de memória crítico (≥80%)');
    }
    if (info.memoryUsagePercent >= 60 && info.memoryUsagePercent < 80) {
      console.log('⚡ AVISO: Uso de memória elevado (60-80%)');
    }
  });
}

// Executar aplicação
main().catch((error) => {
  console.error('❌ Erro ao iniciar aplicação:', error);
  process.exit(1);
});
