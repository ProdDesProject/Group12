package net.runelite.client.plugins.beerplugin;

import com.google.inject.Provides;
import java.io.IOException;
import java.util.Objects;
import javax.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import net.runelite.api.Client;
import net.runelite.api.GameState;
import net.runelite.api.Player;
import net.runelite.api.WorldType;
import net.runelite.api.events.GameStateChanged;
import net.runelite.api.events.GameTick;
import net.runelite.client.config.ConfigManager;
import net.runelite.client.eventbus.Subscribe;
import net.runelite.client.plugins.Plugin;
import net.runelite.client.plugins.PluginDescriptor;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@PluginDescriptor(
        name = "Beer Plugin",
        description = "Updates stats on osrs beer when you log out",
        enabledByDefault = false
)
@Slf4j
public class BeerPlugin extends Plugin
{
    /**
     * Amount of EXP that must be gained for an update to be submitted.
     */
    private static final int XP_THRESHOLD = 1000;

    @Inject
    private Client client;

    @Inject
    private BeerPluginConfig config;

    @Inject
    private OkHttpClient okHttpClient;

    private String lastUsername;
    private boolean fetchXp;
    private long lastXp;

    @Provides
    BeerPluginConfig getConfig(ConfigManager configManager)
    {
        return configManager.getConfig(BeerPluginConfig.class);
    }

    @Override
    protected void startUp()
    {
        fetchXp = true;
    }

    @Subscribe
    public void onGameStateChanged(GameStateChanged gameStateChanged)
    {
        GameState state = gameStateChanged.getGameState();
        if (state == GameState.LOGGED_IN)
        {
            if (!Objects.equals(client.getUsername(), lastUsername))
            {
                lastUsername = client.getUsername();
                fetchXp = true;
            }
        }
        else if (state == GameState.LOGIN_SCREEN)
        {
            Player local = client.getLocalPlayer();
            if (local == null)
            {
                return;
            }

            long totalXp = client.getOverallExperience();
            // Don't submit update unless xp threshold is reached
            if (Math.abs(totalXp - lastXp) > XP_THRESHOLD)
            {
                log.debug("Submitting update for {}", local.getName());
                update(local.getName());
                lastXp = totalXp;
            }
        }
    }

    @Subscribe
    public void onGameTick(GameTick gameTick)
    {
        if (fetchXp)
        {
            lastXp = client.getOverallExperience();
            fetchXp = false;
        }
    }

    private void update(String username)
    {
        String reformedUsername = username.replace(" ", "_");



        if (config.osrsbeer())
        {
            HttpUrl url = new HttpUrl.Builder()
                    .scheme("https")
                    .host("osrsbeer.com")
                    .addPathSegment("tracker")
                    .addPathSegment("data.php")
                    .addQueryParameter("player", reformedUsername)
                    .build();

            Request request = new Request.Builder()
                    .header("User-Agent", "RuneLite")
                    .url(url)
                    .build();

            sendRequest("osrsbeer", request);
        }

    }

    private void sendRequest(String platform, Request request)
    {
        okHttpClient.newCall(request).enqueue(new Callback()
        {
            @Override
            public void onFailure(Call call, IOException e)
            {
                log.warn("Error submitting {} update, caused by {}.", platform, e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response)
            {
                response.close();
            }
        });
    }


}
