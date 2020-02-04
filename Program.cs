using System;
using System.Threading.Tasks;

using Discord;
using Discord.WebSocket;

using Microsoft.Extensions.Configuration;

namespace PenguinUtility
{
    class Program
    {
        private readonly DiscordSocketClient Client;
        private readonly IConfiguration Config;

        static void Main(string[] args)
        {
            new Program().MainAsync().GetAwaiter().GetResult();
        }

        public Program()
        {
            Client = new DiscordSocketClient();

            Client.Log += LogAsync;
            Client.MessageReceived += MessageReceivedAsync;

            var _builder = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("config.json");            
            Config = _builder.Build();
        }

        public async Task MainAsync()
        {
            await Client.LoginAsync(TokenType.Bot, Config["Token"]);
            await Client.StartAsync();

            await Task.Delay(-1);
        }

        private Task LogAsync(LogMessage log)
        {
            Console.WriteLine(log.ToString());
            return Task.CompletedTask;
        }

        private async Task MessageReceivedAsync(SocketMessage message)
        {
            if (message.Author.Id == Client.CurrentUser.Id) return;

            if (message.Content == ".hello")
            {
                await message.Channel.SendMessageAsync("world!");
            }  
        }
    }
}
