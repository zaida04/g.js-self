import { APIEmbed } from '@guildedjs/guilded-api-typings';

/**
 * This test suite only tests the basic functionality of Embeds. If you wish to test edge cases, PR it.
 */
import { Embed } from '..';
const BASE_EMBED_DATA: APIEmbed = {
    author: {
        icon_url: 'https://google.com/authortesticon',
        name: 'TEST_AUTHOR',
        proxy_icon_url: 'https://google.com/authorproxyicontest',
        url: 'https://google.com/authortesturl',
    },
    color: 0x99aab5,
    description: 'TEST_DESCRIPTION',
    fields: [
        {
            inline: false,
            name: 'FIELD_1',
            value: 'FIELD_VALUE_1',
        },
        {
            inline: false,
            name: 'FIELD_2',
            value: 'FIELD_VALUE_2',
        },
    ],
    footer: {
        icon_url: 'https://google.com/footertest',
        proxy_icon_url: 'https://google.com/footerproxyicontest',
        text: 'TEST_FOOTER_TEXT',
    },
    image: {
        height: '50',
        proxy_url: 'https://google.com/imageproxytest',
        url: 'https://google.com/imagetest',
        width: '25',
    },
    provider: {
        name: 'TEST_PROVIDER',
        url: 'https://google.com/providertest',
    },
    thumbnail: {
        height: '51',
        proxy_url: 'https://google.com/thumbnailproxytest',
        url: 'https://google.com/thumbnailtest',
        width: '26',
    },
    timestamp: '2021-08-04T02:46:17.206Z',
    title: 'TEST_TITLE',
    url: 'https://google.com',
    video: {
        height: '52',
        proxy_url: 'https://google.com/videoproxytest',
        url: 'https://google.com/videotest',
        width: '27',
    },
};

test('Check plain Embed properties', () => {
    const embed = new Embed(BASE_EMBED_DATA);
    expect(embed.title).toStrictEqual(BASE_EMBED_DATA.title);
    expect(embed.description).toStrictEqual(BASE_EMBED_DATA.description);
    expect(embed.url).toStrictEqual(BASE_EMBED_DATA.url);
    expect(embed.timestampString).toStrictEqual(BASE_EMBED_DATA.timestamp);
    expect(embed.timestamp).toStrictEqual(Date.parse(BASE_EMBED_DATA.timestamp));
    expect(embed.color).toStrictEqual(BASE_EMBED_DATA.color);
    expect(embed.footer.text).toStrictEqual(BASE_EMBED_DATA.footer.text);
    expect(embed.footer.iconURL).toStrictEqual(BASE_EMBED_DATA.footer.icon_url);
    expect(embed.image.height).toStrictEqual(BASE_EMBED_DATA.image.height);
    expect(embed.image.url).toStrictEqual(BASE_EMBED_DATA.image.url);
    expect(embed.image.width).toStrictEqual(BASE_EMBED_DATA.image.width);
    expect(embed.thumbnail.height).toStrictEqual(BASE_EMBED_DATA.thumbnail.height);
    expect(embed.thumbnail.width).toStrictEqual(BASE_EMBED_DATA.thumbnail.width);
    expect(embed.thumbnail.proxyURL).not.toBeNull();
    expect(embed.video.height).toStrictEqual(BASE_EMBED_DATA.video.height);
    expect(embed.video.width).toStrictEqual(BASE_EMBED_DATA.video.width);
    expect(embed.video.url).toStrictEqual(BASE_EMBED_DATA.video.url);
    expect(embed.provider.name).toStrictEqual(BASE_EMBED_DATA.provider.name);
    expect(embed.provider.url).toStrictEqual(BASE_EMBED_DATA.provider.url);
    expect(embed.author.iconURL).toStrictEqual(BASE_EMBED_DATA.author.icon_url);
    expect(embed.author.name).toStrictEqual(BASE_EMBED_DATA.author.name);
    expect(embed.author.url).toStrictEqual(BASE_EMBED_DATA.author.url);
    expect(embed.fields[0].name).toStrictEqual(BASE_EMBED_DATA.fields[0].name);
    expect(embed.fields[0].value).toStrictEqual(BASE_EMBED_DATA.fields[0].value);
    expect(embed.fields[0].inline).toStrictEqual(false);
    expect(embed.toJSON()).toStrictEqual(BASE_EMBED_DATA);
});

describe('Test complex properties', () => {
    const embed = new Embed();
    test('Pass nothing into setTimestamp', () => {
        embed.setTimestamp();
        expect(embed.timestamp).not.toBeNull();
        expect(embed.timestampString).not.toBeNull();
    });
    test('Pass Date object into setTimestamp', () => {
        const d = new Date();
        embed.setTimestamp(d);
        expect(embed.timestamp).toStrictEqual(d.getTime());
        expect(embed.timestampString).toStrictEqual(d.toISOString());
    });
    test('Pass number timestamp into setTimestamp', () => {
        const d2 = new Date();
        embed.setTimestamp(d2.getTime());
        expect(embed.timestamp).toStrictEqual(d2.getTime());
        expect(embed.timestampString).toStrictEqual(d2.toISOString());
    });
    test('Pass string into setTimestamp', () => {
        const d3 = new Date();
        embed.setTimestamp(d3.toISOString());
        expect(embed.timestamp).toStrictEqual(d3.getTime());
        expect(embed.timestampString).toStrictEqual(d3.toISOString());
    });
    test('Pass null into setTimestamp', () => {
        embed.setTimestamp(null);
        expect(embed.timestamp).toBeNull();
        expect(embed.timestampString).toBeNull();
    });
    test('Error on invalid DateResolveable', () => {
        expect(() => embed.setTimestamp('SDIHFISUDHF')).toThrow(
            new TypeError('Invalid DateResolvable passed into setTimestamp.'),
        );
    });
});

test('Set properties to null', () => {
    const embed = new Embed(BASE_EMBED_DATA);
    embed.setColor(null);
    embed.setFooter(null, null, null);
    embed.setImage(null, null, null);
    embed.setThumbnail(null, null, null);
    embed.setVideo(null, null, null);
    embed.setProvider(null, null);
    embed.setURL(null);
    embed.setAuthor(null, null, null, null);
    embed.setTimestamp(null);
    embed.setDescription(null);
    embed.setTitle(null);
    expect(embed.title).toStrictEqual(null);
    expect(embed.description).toStrictEqual(null);
    expect(embed.url).toStrictEqual(null);
    expect(embed.timestampString).toStrictEqual(null);
    expect(embed.timestamp).toStrictEqual(null);
    expect(embed.color).toStrictEqual(null);
    expect(embed.footer).toStrictEqual(null);
    expect(embed.image).toStrictEqual(null);
    expect(embed.thumbnail).toStrictEqual(null);
    expect(embed.video).toStrictEqual(null);
    expect(embed.provider).toStrictEqual(null);
    expect(embed.author).toStrictEqual(null);
    const embedJSON = embed.toJSON();
    expect(embedJSON.title).toStrictEqual(undefined);
    expect(embedJSON.description).toStrictEqual(undefined);
    expect(embedJSON.url).toStrictEqual(undefined);
    expect(embedJSON.timestamp).toStrictEqual(undefined);
    expect(embedJSON.color).toStrictEqual(undefined);
    expect(embedJSON.footer).toStrictEqual(undefined);
    expect(embedJSON.image).toStrictEqual(undefined);
    expect(embedJSON.thumbnail).toStrictEqual(undefined);
    expect(embedJSON.video).toStrictEqual(undefined);
    expect(embedJSON.provider).toStrictEqual(undefined);
    expect(embedJSON.author).toStrictEqual(undefined);
});

describe('Test field methods', () => {
    const embed = new Embed();

    test('Add fields to Embed', () => {
        embed.addField(BASE_EMBED_DATA.fields[0].name, BASE_EMBED_DATA.fields[0].value);
        expect(embed.fields[0].name).toStrictEqual(BASE_EMBED_DATA.fields[0].name);
        expect(embed.fields[0].value).toStrictEqual(BASE_EMBED_DATA.fields[0].value);
    });

    test('Clear all fields on Embed', () => {
        embed.clearFields();
        expect(embed.fields).toStrictEqual([]);
    });
});
