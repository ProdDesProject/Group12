package net.runelite.client.plugins.beerplugin;

import net.runelite.client.config.Config;
import net.runelite.client.config.ConfigGroup;
import net.runelite.client.config.ConfigItem;

@ConfigGroup("beerplugin")

public interface BeerPluginConfig extends Config
{
    @ConfigItem(
            position = 1,
            keyName = "osrsbeer",
            name = "OSRS Beer",
            description = "Automatically updates your stats on osrsbeer.com when you log out"
    )
    default boolean osrsbeer()
    {
        return false;
    }

}
